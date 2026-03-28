'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { teaShops as allShops, TeaShop, Offering, TeaType } from '@/lib/tea-shops';
import { getDistance } from '@/lib/utils';
import { ShopList } from './shop-list';
import { ShopMap } from './shop-map';
import { ShopDetails } from './shop-details';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Icons } from './icons';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RecommendationsTool } from './recommendations-tool';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

type Filters = {
  offerings: string[];
  teaTypes: string[];
  ethical: boolean;
};

const offeringOptions: { name: Offering; icon: keyof typeof Icons }[] = [
  { name: 'loose leaf', icon: 'looseLeaf' },
  { name: 'teaware', icon: 'teaware' },
  { name: 'classes', icon: 'classes' },
];

const pureTeaOptions: { name: TeaType }[] = [
    { name: 'black' },
    { name: 'green' },
    { name: 'oolong' },
    { name: 'white' },
    { name: 'dark' },
    { name: 'yellow' },
    { name: 'puerh' },
    { name: 'matcha' },
];

const flavoredTeaOptions: { name: TeaType }[] = [
    { name: 'jasmine' },
    { name: 'earl grey' },
    { name: 'chai' },
];

const herbalTeaOptions: { name: TeaType }[] = [
    { name: 'herbal' },
    { name: 'rooibos' },
    { name: 'chamomile' },
    { name: 'mint' },
    { name: 'mate' },
];

const DEFAULT_LOCATION = { lat: 41.0793, lng: -85.1393 }; // Fort Wayne, IN

export function TeaFinder() {
  const [shopsData, setShopsData] = useState<TeaShop[]>(allShops);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<React.ReactNode | null>(null);
  const [radius, setRadius] = useState(150); // in miles
  const [filters, setFilters] = useState<Filters>({ offerings: [], teaTypes: [], ethical: false });
  const [selectedShop, setSelectedShop] = useState<TeaShop | null>(null);
  const [hoveredShopId, setHoveredShopId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [isLocating, setIsLocating] = useState(true);
  const [praisedShops, setPraisedShops] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const db = useFirestore();

  const logAnalyticsEvent = useCallback((type: string, value: string) => {
    if (!db) return;
    const eventsCollection = collection(db, 'analyticsEvents');
    addDoc(eventsCollection, {
      type,
      value,
      timestamp: serverTimestamp(),
    }).catch((error) => console.error("Error logging analytics event: ", error));
  }, [db]);

  useEffect(() => {
    setIsClient(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null);
          setIsLocating(false);
        },
        error => {
          console.error("Error getting location:", error);
          setLocationError('Could not get your location. Please enable location services or enter an address.');
          setUserLocation(null);
          setIsLocating(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Please enter an address.');
      setUserLocation(null);
      setIsLocating(false);
    }
  }, []);

  const handleLocationSearch = useCallback(async () => {
    if (!locationInput) return;
    
    logAnalyticsEvent('locationSearch', locationInput);
    setLocationError(null);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setLocationError(
        <Alert variant="destructive">
          <Icons.logo className="h-4 w-4" />
          <AlertTitle>API Key Missing</AlertTitle>
          <AlertDescription>
            Please add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your <code>.env</code> file.
          </AlertDescription>
        </Alert>
      );
      return;
    }

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&components=country:US&key=${apiKey}`);
      const data = await response.json();

      if (data.status === 'OK' && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setUserLocation({ lat, lng });
      } else {
        if (data.status === 'REQUEST_DENIED' || data.error_message?.includes('billing')) {
          setLocationError(
            <Alert variant="destructive">
              <Icons.logo className="h-4 w-4" />
              <AlertTitle>Google Maps API Action Required</AlertTitle>
              <AlertDescription className="mt-2 space-y-3">
                <p>Google has denied the request. This is usually due to one of these common setup issues:</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong>Billing Not Linked:</strong> Even for the free tier, Google requires a valid credit card linked to your project.
                    <br />
                    <a href="https://console.cloud.google.com/billing" target="_blank" rel="noopener noreferrer" className="underline font-medium text-destructive">Link Billing Account</a>
                  </li>
                  <li>
                    <strong>Geocoding API Disabled:</strong> You must manually enable this specific API in the library.
                    <br />
                    <a href="https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com" target="_blank" rel="noopener noreferrer" className="underline font-medium text-destructive">Enable Geocoding API</a>
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          );
        } else if (data.status === 'ZERO_RESULTS') {
          setLocationError(`Could not find location: "${locationInput}". Please try a more specific address or zip code.`);
        } else {
          setLocationError(`Google Maps Error: ${data.status}. Please check your API configuration.`);
        }
        setUserLocation(null);
      }
    } catch (error) {
      console.error("Error geocoding:", error);
      setLocationError("There was an error searching for the location. Please check your internet connection.");
      setUserLocation(null);
    }
  }, [locationInput, logAnalyticsEvent]);

  const handleFilterChange = useCallback((offering: string) => {
    logAnalyticsEvent('filterClick_offering', offering);
    setFilters(prev => {
      const newOfferings = prev.offerings.includes(offering)
        ? prev.offerings.filter(o => o !== offering)
        : [...prev.offerings, offering];
      return { ...prev, offerings: newOfferings };
    });
  }, [logAnalyticsEvent]);

  const handleTeaTypeFilterChange = useCallback((teaType: string) => {
    logAnalyticsEvent('filterClick_teaType', teaType);
    setFilters(prev => {
      const newTeaTypes = prev.teaTypes.includes(teaType)
        ? prev.teaTypes.filter(t => t !== teaType)
        : [...prev.teaTypes, teaType];
      return { ...prev, teaTypes: newTeaTypes };
    });
  }, [logAnalyticsEvent]);

  const handlePraise = useCallback((shopId: string) => {
    if (praisedShops.includes(shopId)) {
        return;
    }
    setPraisedShops(prev => [...prev, shopId]);
  }, [praisedShops]);

  const handleAddTag = useCallback((shopId: string, tag: string) => {
    setShopsData(currentShops =>
      currentShops.map(shop => {
        if (shop.id === shopId) {
          const newTags = [...(shop.userTags || [])];
          if (!newTags.includes(tag.toLowerCase())) {
            newTags.push(tag.toLowerCase());
          }
          return { ...shop, userTags: newTags };
        }
        return shop;
      })
    );
  }, []);

  const filteredShops = useMemo(() => {
    let baseShops = shopsData;

    if(userLocation) {
        baseShops = baseShops.map(shop => ({
            ...shop,
            distance: getDistance(userLocation.lat, userLocation.lng, shop.location.lat, shop.location.lng),
        })).filter(shop => shop.distance <= radius);
    }
    
    return baseShops
      .filter(shop => !filters.ethical || shop.ethical)
      .filter(shop => filters.offerings.length === 0 || filters.offerings.every(f => shop.offerings.includes(f as Offering)))
      .filter(shop => {
          const allShopTags = [
              ...shop.teaTypes,
              ...(shop.userTags || [])
          ];
          return filters.teaTypes.length === 0 || filters.teaTypes.every(t => allShopTags.includes(t as TeaType))
      })
      .sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
  }, [userLocation, radius, filters, shopsData]);

  const mapCenter = useMemo(() => userLocation || DEFAULT_LOCATION, [userLocation]);

  const shopForDetails = useMemo(() => {
    if (!selectedShop) return null;
    return filteredShops.find(s => s.id === selectedShop.id) || null;
  }, [selectedShop, filteredShops]);

  if (!isClient || isLocating) {
    return (
      <section id="finder" className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              Finding Tea Shops Near You...
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Please wait while we pinpoint your location to bring you the best local tea experiences.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </section>
    );
  }

  const searchInputGroup = (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Input 
            placeholder="Enter an address, city, or zip code" 
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleLocationSearch();
                }
            }}
            className="flex-grow bg-white h-12 shadow-sm border-primary/20"
        />
        <Button onClick={handleLocationSearch} size="lg" className="w-full sm:w-auto shadow-md">
            <Icons.search className="mr-2 h-4 w-4" />
            Search
        </Button>
    </div>
  );

  return (
    <section id="finder" className="w-full">
      {!userLocation && (
        <div className="w-full bg-gradient-to-r from-[#fdf8f5] to-[#f3eef8] py-16 md:py-24 mb-12 border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Mobile: Image on top */}
              <div className="w-full md:w-[40%] flex justify-center order-first md:order-last">
                <Image 
                  src="/chammy-logo.png" 
                  alt="QTeaCake mascot Chammy" 
                  width={300} 
                  height={300} 
                  className="w-[200px] md:w-[300px] h-auto drop-shadow-2xl animate-in zoom-in duration-700"
                  priority
                />
              </div>
              
              <div className="w-full md:w-[60%] space-y-6">
                <div className="space-y-4">
                  <p className="text-secondary font-bold tracking-widest uppercase text-sm">Your Tea Community</p>
                  <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary leading-[1.1]">
                    Discover Authentic Tea Shops Near You
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl leading-relaxed">
                    Tired of searching for quality loose-leaf tea? QTeaCake maps the best local tea shops so you never have to settle for tea bags again. Whether you're a seasoned gongfu brewer or just starting your tea journey, we'll help you find your perfect cup.
                  </p>
                </div>
                
                <div className="w-full max-w-lg pt-4">
                  {locationError && <div className="mb-4">{locationError}</div>}
                  {searchInputGroup}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 space-y-8 mb-16">
        <Alert className="border-secondary/20 bg-secondary/5">
          <Icons.mapPin className="h-4 w-4 text-secondary" />
          <AlertDescription>
            <strong>Geographic Note:</strong> This version currently features select areas in Ohio, Indiana, Illinois, Michigan, and New York. Support for more areas is coming soon!
          </AlertDescription>
        </Alert>

        {userLocation && (
          <Card className="shadow-lg animate-in slide-in-from-top-4 duration-500 border-primary/10">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2 text-primary">
                  <Icons.mapPin className="h-6 w-6" />
                  Update Your Location
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  {locationError && <div className="mb-4">{locationError}</div>}
                  {searchInputGroup}
              </CardContent>
          </Card>
        )}
            
        {userLocation && (
        <>
            <Card className="shadow-lg border-primary/10">
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Icons.filters className="h-6 w-6 text-primary" />
                    Refine Your Search
                  </CardTitle>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="[&>svg]:transition-transform [&>svg]:duration-200 [&[data-state=open]>svg]:rotate-180">
                      <Icons.chevronDown className="h-5 w-5" />
                      <span className="sr-only">Toggle Filters</span>
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label htmlFor="radius-slider">
                      Search Radius:{" "}
                      <span className="font-medium text-foreground">{radius}</span> miles
                    </Label>
                    <Slider
                      id="radius-slider"
                      value={[radius]}
                      onValueChange={([val]) => setRadius(val)}
                      max={250}
                      step={5}
                    />
                  </div>
                  <CollapsibleContent className="mt-8 grid gap-8 md:grid-cols-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
                    <div className="space-y-4">
                      <Label>Values</Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={filters.ethical ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => {
                            logAnalyticsEvent('filterClick_ethical', String(!filters.ethical));
                            setFilters((prev) => ({
                              ...prev,
                              ethical: !prev.ethical,
                            }));
                          }}
                        >
                          <Icons.ethical className="mr-2 h-4 w-4" />
                          Ethical Sourcing
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4 md:col-span-2">
                      <Label>Offerings</Label>
                      <div className="flex flex-wrap gap-2">
                        {offeringOptions.map((option) => {
                          const Icon = Icons[option.icon];
                          return (
                            <Button
                              key={option.name}
                              variant={
                                filters.offerings.includes(option.name)
                                  ? "secondary"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleFilterChange(option.name)}
                              className="capitalize"
                            >
                              <Icon className="mr-2 h-4 w-4" />
                              {option.name}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-6 md:col-span-2">
                      <div className="space-y-2">
                        <Label className="font-semibold text-foreground/90">Pure (Unflavored) Tea</Label>
                        <div className="flex flex-wrap gap-2">
                          {pureTeaOptions.map((option) => (
                            <Button
                              key={option.name}
                              variant={
                                filters.teaTypes.includes(option.name)
                                  ? "secondary"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleTeaTypeFilterChange(option.name)}
                              className="capitalize"
                            >
                              {option.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold text-foreground/90">Flavored Tea</Label>
                        <div className="flex flex-wrap gap-2">
                          {flavoredTeaOptions.map((option) => (
                            <Button
                              key={option.name}
                              variant={
                                filters.teaTypes.includes(option.name)
                                  ? "secondary"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleTeaTypeFilterChange(option.name)}
                              className="capitalize"
                            >
                              {option.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold text-foreground/90">Herbal Tea</Label>
                        <div className="flex flex-wrap gap-2">
                          {herbalTeaOptions.map((option) => (
                            <Button
                              key={option.name}
                              variant={
                                filters.teaTypes.includes(option.name)
                                  ? "secondary"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleTeaTypeFilterChange(option.name)}
                              className="capitalize"
                            >
                              {option.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CardContent>
              </Collapsible>
            </Card>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4 h-[60vh] lg:h-[80vh] overflow-y-auto pr-2">
                  <ShopList 
                  shops={filteredShops} 
                  onSelectShop={(shop) => {
                      logAnalyticsEvent('shopClick', shop.id);
                      setSelectedShop(shop);
                  }}
                  onHoverShop={setHoveredShopId}
                  hoveredShopId={hoveredShopId}
                  />
              </div>
              <div className="lg:col-span-8 h-[60vh] lg:h-[80vh] rounded-lg overflow-hidden shadow-lg border border-primary/10">
                  <ShopMap
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                  shops={filteredShops}
                  center={mapCenter}
                  onSelectShop={(shop) => {
                      logAnalyticsEvent('shopClick', shop.id);
                      setSelectedShop(shop);
                  }}
                  onHoverShop={setHoveredShopId}
                  hoveredShopId={hoveredShopId}
                  />
              </div>
            </div>

            <div className="text-center pt-8">
                <p className="text-sm text-muted-foreground mb-6">
                    We attempt to use your browser's location. If the map is wrong, or you want to search elsewhere, please enter a location.
                </p>
                <RecommendationsTool nearbyShops={filteredShops} />
            </div>

            <ShopDetails 
              shop={shopForDetails} 
              isOpen={!!selectedShop} 
              onOpenChange={(open) => !open && setSelectedShop(null)}
              onPraise={handlePraise}
              onAddTag={handleAddTag}
              praisedShops={praisedShops}
            />
        </>
        )}
      </div>
    </section>
  );
}