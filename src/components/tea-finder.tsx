'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { teaShops as allShops, TeaShop, Offering, TeaType } from '@/lib/tea-shops';
import { getDistance } from '@/lib/utils';
import { ShopList } from './shop-list';
import { ShopMap } from './shop-map';
import { ShopDetails } from './shop-details';
import { Icons } from './icons';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
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

const DEFAULT_LOCATION = { lat: 41.0793, lng: -85.1393 }; // Fort Wayne, IN

export function TeaFinder() {
  const [shopsData, setShopsData] = useState<TeaShop[]>(allShops);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<React.Node | null>(null);
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
    
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&components=country:US&key=${apiKey}`);
      const data = await response.json();

      if (data.status === 'OK' && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setUserLocation({ lat, lng });
      } else {
        setLocationError(`Could not find location: "${locationInput}".`);
        setUserLocation(null);
      }
    } catch (error) {
      console.error("Error geocoding:", error);
      setLocationError("There was an error searching for the location.");
      setUserLocation(null);
    }
  }, [locationInput, logAnalyticsEvent]);

  const handleFilterChange = (offering: string) => {
    setFilters(prev => ({
      ...prev,
      offerings: prev.offerings.includes(offering)
        ? prev.offerings.filter(o => o !== offering)
        : [...prev.offerings, offering],
    }));
  };

  const handleTeaTypeFilterChange = (teaType: string) => {
    setFilters(prev => ({
      ...prev,
      teaTypes: prev.teaTypes.includes(teaType)
        ? prev.teaTypes.filter(t => t !== teaType)
        : [...prev.teaTypes, teaType],
    }));
  };

  const handlePraise = (shopId: string) => {
    if (!praisedShops.includes(shopId)) {
      setPraisedShops(prev => [...prev, shopId]);
      logAnalyticsEvent('praise', shopId);
    }
  };

  const shopsWithDistance = useMemo(() => {
    if (!userLocation) return shopsData;
    return shopsData.map(shop => ({
      ...shop,
      distance: getDistance(userLocation.lat, userLocation.lng, shop.location.lat, shop.location.lng),
    })).sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
  }, [userLocation, shopsData]);

  const filteredShops = useMemo(() => {
    const applyFilters = (shops: TeaShop[]) =>
      shops
        .filter(shop => !filters.ethical || shop.ethical)
        .filter(shop => filters.offerings.length === 0 || filters.offerings.every(f => shop.offerings.includes(f as Offering)))
        .filter(shop => filters.teaTypes.length === 0 || filters.teaTypes.every(t => shop.teaTypes.includes(t as TeaType)));

    const withinRadius = shopsWithDistance.filter(shop => (shop.distance ?? 0) <= radius);
    const filtered = applyFilters(withinRadius);
    // Always fall back to nearest shops — never show zero results
    if (filtered.length === 0) return applyFilters(shopsWithDistance);
    return filtered;
  }, [shopsWithDistance, radius, filters]);

  const isShowingBeyondRadius = useMemo(() => {
    const withinRadius = shopsWithDistance.filter(shop => (shop.distance ?? 0) <= radius);
    const applyFilters = (shops: TeaShop[]) =>
      shops
        .filter(shop => !filters.ethical || shop.ethical)
        .filter(shop => filters.offerings.length === 0 || filters.offerings.every(f => shop.offerings.includes(f as Offering)))
        .filter(shop => filters.teaTypes.length === 0 || filters.teaTypes.every(t => shop.teaTypes.includes(t as TeaType)));
    return !!userLocation && applyFilters(withinRadius).length === 0;
  }, [shopsWithDistance, radius, filters, userLocation]);

  const mapCenter = useMemo(() => userLocation || DEFAULT_LOCATION, [userLocation]);

  const isTeaDesert = !!userLocation && !!locationInput && isShowingBeyondRadius;

  // Log tea desert hits silently for analytics
  useEffect(() => {
    if (isTeaDesert) {
      logAnalyticsEvent('teaDesert', locationInput);
    }
  }, [isTeaDesert, locationInput, logAnalyticsEvent]);

  if (!isClient || isLocating) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-4">
        <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
        <h2 className="font-headline text-3xl font-bold text-primary">Pinpointing Location...</h2>
      </div>
    );
  }

  const searchInputGroup = (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-lg">
        <Input 
            placeholder="Enter an address, city, or zip code" 
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
            className="flex-grow bg-white h-12"
        />
        <Button onClick={handleLocationSearch} size="lg" className="h-12 bg-primary">
            <Icons.search className="mr-2 h-4 w-4" />
            Search
        </Button>
    </div>
  );

  return (
    <div className="w-full">
      {!userLocation && (
        <div className="w-full bg-gradient-to-r from-[#fdf8f5] to-[#f3eef8] py-16 md:py-24 border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl space-y-6">
              <p className="text-secondary font-bold uppercase tracking-widest text-sm">Your Tea Community</p>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
                Discover Authentic Tea Shops Near You
              </h1>
              <p className="max-w-2xl text-foreground/80 md:text-xl leading-relaxed">
                Tired of searching for quality loose-leaf tea? QTeaCake maps the best local tea shops so you never have to settle for tea bags again. Whether you're a seasoned gongfu brewer or just starting your tea journey, we'll help you find your perfect cup.
              </p>
              <div className="pt-6">
                {locationError && <p className="text-muted-foreground mb-4">{locationError}</p>}
                {searchInputGroup}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 space-y-8 mt-12 mb-16">
        <Alert className="border-secondary/20 bg-secondary/5">
          <Icons.mapPin className="h-4 w-4 text-secondary" />
          <AlertDescription>
            <strong>Geographic Note:</strong> This version currently features select areas in Ohio, Indiana, Illinois, Michigan, and New York. Support for more areas is coming soon!
          </AlertDescription>
        </Alert>

        {userLocation && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-4">
                <h2 className="font-headline text-3xl font-bold text-primary">Nearby Results</h2>
                {searchInputGroup}
              </div>
              <RecommendationsTool nearbyShops={filteredShops} />
            </div>

            <Card className="border-primary/10">
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Icons.filters className="h-5 w-5 text-primary" />
                    Refine Your Search
                  </CardTitle>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Icons.chevronDown className="h-5 w-5" />
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4 mb-8">
                    <Label htmlFor="radius-slider">
                      Search Radius: <span className="font-medium text-foreground">{radius} miles</span>
                    </Label>
                    <Slider
                      id="radius-slider"
                      value={[radius]}
                      onValueChange={([val]) => setRadius(val)}
                      max={250}
                      step={5}
                    />
                  </div>
                  <CollapsibleContent className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-4">
                      <Label>Values</Label>
                      <Button
                        variant={filters.ethical ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setFilters(p => ({ ...p, ethical: !p.ethical }))}
                        className="w-full justify-start"
                      >
                        <Icons.ethical className="mr-2 h-4 w-4" />
                        Ethical Sourcing
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <Label>Offerings</Label>
                      <div className="flex flex-wrap gap-2">
                        {offeringOptions.map(o => (
                          <Button
                            key={o.name}
                            variant={filters.offerings.includes(o.name) ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => handleFilterChange(o.name)}
                          >
                            {o.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Tea Types</Label>
                      <div className="flex flex-wrap gap-2">
                        {pureTeaOptions.map(t => (
                          <Button
                            key={t.name}
                            variant={filters.teaTypes.includes(t.name) ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => handleTeaTypeFilterChange(t.name)}
                          >
                            {t.name}
                          </Button>
                        ))}
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
              <div className="lg:col-span-8 h-[60vh] lg:h-[80vh] rounded-lg overflow-hidden border border-primary/10">
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
          </div>
        )}

        <ShopDetails 
          shop={selectedShop} 
          isOpen={!!selectedShop} 
          onOpenChange={(open) => !open && setSelectedShop(null)}
          onPraise={handlePraise}
          onAddTag={() => {}}
          praisedShops={praisedShops}
        />
      </div>
    </div>
  );
}
