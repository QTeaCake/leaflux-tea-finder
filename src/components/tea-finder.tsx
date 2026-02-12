'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { teaShops as allShops, TeaShop, Offering, TeaType, UserTag } from '@/lib/tea-shops';
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

const teaTypeOptions: { name: TeaType }[] = [
    { name: 'white' },
    { name: 'green' },
    { name: 'yellow' },
    { name: 'oolong' },
    { name: 'black' },
    { name: 'puerh' },
    { name: 'dark' },
    { name: 'herbal' },
    { name: 'matcha' },
];

const DEFAULT_LOCATION = { lat: 41.0793, lng: -85.1393 }; // Fort Wayne, IN

export function TeaFinder() {
  const [shopsData, setShopsData] = useState<TeaShop[]>(allShops);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [radius, setRadius] = useState(150); // in miles
  const [filters, setFilters] = useState<Filters>({ offerings: [], teaTypes: [], ethical: false });
  const [selectedShop, setSelectedShop] = useState<TeaShop | null>(null);
  const [hoveredShopId, setHoveredShopId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [isLocating, setIsLocating] = useState(true);
  const [praisedShops, setPraisedShops] = useState<string[]>([]);
  const [votedTags, setVotedTags] = useState<{ [tagId: string]: 'up' | 'down' }>({});

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

    setLocationError(null);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setLocationError("API Key is missing for geocoding.");
      return;
    }

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&components=country:US&key=${apiKey}`);
      const data = await response.json();

      if (data.status === 'OK' && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setUserLocation({ lat, lng });
      } else {
        console.error('Geocoding API Error:', data.status, data.error_message);
        setLocationError(`Could not find location: "${locationInput}". Please try again.`);
        setUserLocation(null);
      }
    } catch (error) {
      console.error("Error geocoding:", error);
      setLocationError("There was an error searching for the location.");
      setUserLocation(null);
    }
  }, [locationInput]);

  const handleFilterChange = useCallback((offering: string) => {
    setFilters(prev => {
      const newOfferings = prev.offerings.includes(offering)
        ? prev.offerings.filter(o => o !== offering)
        : [...prev.offerings, offering];
      return { ...prev, offerings: newOfferings };
    });
  }, []);

  const handleTeaTypeFilterChange = useCallback((teaType: string) => {
    setFilters(prev => {
      const newTeaTypes = prev.teaTypes.includes(teaType)
        ? prev.teaTypes.filter(t => t !== teaType)
        : [...prev.teaTypes, teaType];
      return { ...prev, teaTypes: newTeaTypes };
    });
  }, []);

  const handlePraise = useCallback((shopId: string) => {
    if (praisedShops.includes(shopId)) {
        return;
    }

    setShopsData(currentShops =>
      currentShops.map(shop => {
        if (shop.id === shopId) {
          return { ...shop, praise: (shop.praise || 0) + 1 };
        }
        return shop;
      })
    );
    setPraisedShops(prev => [...prev, shopId]);
  }, [praisedShops]);

  const handleAddTag = useCallback((shopId: string, tag: string) => {
    setShopsData(currentShops =>
      currentShops.map(shop => {
        if (shop.id === shopId) {
          const newTags = [...(shop.userTags || [])];
          if (!newTags.some(t => t.name === tag.toLowerCase())) {
            newTags.push({ name: tag.toLowerCase(), score: 1 });
          }
          return { ...shop, userTags: newTags };
        }
        return shop;
      })
    );
  }, []);
  
  const handleTagVote = useCallback((shopId: string, tagName: string, vote: 'up' | 'down') => {
    const tagId = `${shopId}-${tagName}`;
    if (votedTags[tagId]) return; // Already voted in this session

    setShopsData(currentShops =>
      currentShops.map(shop => {
        if (shop.id === shopId) {
          const newTags = shop.userTags.map(tag => {
            if (tag.name === tagName) {
              return { ...tag, score: tag.score + (vote === 'up' ? 1 : -1) };
            }
            return tag;
          });
          newTags.sort((a, b) => b.score - a.score);
          return { ...shop, userTags: newTags };
        }
        return shop;
      })
    );

    setVotedTags(prev => ({ ...prev, [tagId]: vote }));
  }, [votedTags]);


  const filteredShops = useMemo(() => {
    if (!userLocation) return [];
    
    return shopsData
      .map(shop => ({
        ...shop,
        distance: getDistance(userLocation.lat, userLocation.lng, shop.location.lat, shop.location.lng),
      }))
      .filter(shop => shop.distance <= radius)
      .filter(shop => !filters.ethical || shop.ethical)
      .filter(shop => filters.offerings.length === 0 || filters.offerings.every(f => shop.offerings.includes(f as Offering)))
      .filter(shop => filters.teaTypes.length === 0 || filters.teaTypes.every(t => shop.teaTypes.includes(t as TeaType)))
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation, radius, filters, shopsData]);

  const mapCenter = useMemo(() => userLocation || DEFAULT_LOCATION, [userLocation]);

  const shopForDetails = useMemo(() => {
    if (!selectedShop) return null;
    return shopsData.find(s => s.id === selectedShop.id) || null;
  }, [selectedShop, shopsData]);

  if (!isClient || isLocating) {
    return (
      <section id="finder" className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
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

  return (
    <section id="finder" className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Tea Shops</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Uncover authentic tea shops nearby and fuel your passion for the perfect cup.
          </p>
        </div>
        
        {!userLocation ? (
             <Card className="shadow-lg animate-in fade-in-50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Icons.mapPin className="h-6 w-6 text-primary" />
                    Welcome! Set Your Location to Begin
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {locationError && <p className="text-center text-destructive mb-4">{locationError}</p>}
                    <div className="flex flex-col sm:flex-row gap-2">
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
                            className="flex-grow"
                        />
                        <Button onClick={handleLocationSearch} className="w-full sm:w-auto">
                            <Icons.search className="mr-2 h-4 w-4" />
                            Search
                        </Button>
                    </div>
                     <p className="text-xs text-muted-foreground mt-2 italic">
                        Note: This pre-alpha version is currently limited to select areas in Ohio, Indiana, and Illinois.
                    </p>
                </CardContent>
            </Card>
        ) : (
        <>
            <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Icons.mapPin className="h-6 w-6 text-primary" />
                Set Your Location
                </CardTitle>
            </CardHeader>
            <CardContent>
                {locationError && <p className="text-center text-destructive mb-4">{locationError}</p>}
                <div className="flex flex-col sm:flex-row gap-2">
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
                        className="flex-grow"
                    />
                    <Button onClick={handleLocationSearch} className="w-full sm:w-auto">
                        <Icons.search className="mr-2 h-4 w-4" />
                        Search
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    We attempt to use your browser's location. If the map is wrong, or you want to search elsewhere, please enter a location.
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                    Note: This pre-alpha version is currently limited to select areas in Ohio, Indiana, and Illinois.
                </p>
            </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <Icons.filters className="h-6 w-6 text-primary" />
                  Refine Your Search
                  </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                      <Label htmlFor="radius-slider">Search Radius: <span className="font-medium text-foreground">{radius}</span> miles</Label>
                      <Slider
                          id="radius-slider"
                          value={[radius]}
                          onValueChange={([val]) => setRadius(val)}
                          max={250}
                          step={5}
                      />
                  </div>
                  <div className="space-y-4">
                      <Label>Values</Label>
                      <div className="flex items-center space-x-2">
                          <Button
                              variant={filters.ethical ? 'secondary' : 'outline'}
                              size="sm"
                              onClick={() => setFilters(prev => ({ ...prev, ethical: !prev.ethical }))}
                          >
                              <Icons.ethical className="mr-2 h-4 w-4" />
                              Ethical Sourcing
                          </Button>
                      </div>
                  </div>
                  <div className="space-y-4 md:col-span-2">
                      <Label>Offerings</Label>
                      <div className="flex flex-wrap gap-2">
                          {offeringOptions.map(option => {
                          const Icon = Icons[option.icon];
                          return (
                              <Button
                              key={option.name}
                              variant={filters.offerings.includes(option.name) ? 'secondary' : 'outline'}
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
                  <div className="space-y-4 md:col-span-2">
                      <Label className="flex items-center"><Icons.types className="mr-2 h-4 w-4" />Tea Types</Label>
                      <div className="flex flex-wrap gap-2">
                          {teaTypeOptions.map(option => (
                              <Button
                              key={option.name}
                              variant={filters.teaTypes.includes(option.name) ? 'secondary' : 'outline'}
                              size="sm"
                              onClick={() => handleTeaTypeFilterChange(option.name)}
                              className="capitalize"
                              >
                              {option.name}
                              </Button>
                          ))}
                      </div>
                  </div>
              </CardContent>
            </Card>

            <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 h-[60vh] lg:h-[80vh] overflow-y-auto pr-2">
                <ShopList 
                shops={filteredShops} 
                onSelectShop={setSelectedShop}
                onHoverShop={setHoveredShopId}
                hoveredShopId={hoveredShopId}
                />
            </div>
            <div className="lg:col-span-8 h-[60vh] lg:h-[80vh] rounded-lg overflow-hidden shadow-lg">
                <ShopMap
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                shops={filteredShops}
                center={mapCenter}
                onSelectShop={setSelectedShop}
                onHoverShop={setHoveredShopId}
                hoveredShopId={hoveredShopId}
                />
            </div>
            </div>

            <ShopDetails 
              shop={shopForDetails} 
              isOpen={!!selectedShop} 
              onOpenChange={(open) => !open && setSelectedShop(null)}
              onPraise={handlePraise}
              onAddTag={handleAddTag}
              praisedShops={praisedShops}
              onTagVote={handleTagVote}
              votedTags={votedTags}
            />
        </>
        )}
      </div>
    </section>
  );
}
