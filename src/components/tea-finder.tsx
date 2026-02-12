'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { teaShops as allShops, TeaShop } from '@/lib/tea-shops';
import { getDistance } from '@/lib/utils';
import { ShopList } from './shop-list';
import { ShopMap } from './shop-map';
import { ShopDetails } from './shop-details';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { Icons } from './icons';
import { RecommendationsTool } from './recommendations-tool';

type Filters = {
  offerings: string[];
  ethical: boolean;
};

const offeringOptions = ['loose leaf', 'teaware', 'classes'];

export function TeaFinder() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [radius, setRadius] = useState(10); // in miles
  const [filters, setFilters] = useState<Filters>({ offerings: [], ethical: false });
  const [selectedShop, setSelectedShop] = useState<TeaShop | null>(null);
  const [hoveredShopId, setHoveredShopId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

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
        },
        error => {
          console.error("Error getting location:", error);
          setLocationError('Could not get your location. Please enable location services. Using a default location.');
          setUserLocation({ lat: 34.0522, lng: -118.2437 }); // Default to LA
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Using a default location.');
      setUserLocation({ lat: 34.0522, lng: -118.2437 }); // Default to LA
    }
  }, []);

  const handleFilterChange = useCallback((offering: string) => {
    setFilters(prev => {
      const newOfferings = prev.offerings.includes(offering)
        ? prev.offerings.filter(o => o !== offering)
        : [...prev.offerings, offering];
      return { ...prev, offerings: newOfferings };
    });
  }, []);

  const filteredShops = useMemo(() => {
    if (!userLocation) return [];
    
    return allShops
      .map(shop => ({
        ...shop,
        distance: getDistance(userLocation.lat, userLocation.lng, shop.location.lat, shop.location.lng),
      }))
      .filter(shop => shop.distance <= radius)
      .filter(shop => !filters.ethical || shop.ethical)
      .filter(shop => filters.offerings.length === 0 || filters.offerings.every(f => shop.offerings.includes(f)))
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation, radius, filters]);

  const mapCenter = useMemo(() => userLocation || { lat: 34.0522, lng: -118.2437 }, [userLocation]);

  if (!isClient || !userLocation) {
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
            Use the filters to find the perfect tea shop. Click on a shop in the list or on the map for more details.
          </p>
        </div>
        
        {locationError && <p className="text-center text-destructive">{locationError}</p>}
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Icons.filters className="h-6 w-6 text-primary" />
              Refine Your Search
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <Label htmlFor="radius-slider">Search Radius: {radius} miles</Label>
              <Slider
                id="radius-slider"
                value={[radius]}
                onValueChange={([val]) => setRadius(val)}
                max={50}
                step={1}
              />
            </div>
            <div className="space-y-4">
              <Label>Offerings</Label>
              <div className="flex items-center space-x-4">
                {offeringOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option} 
                      checked={filters.offerings.includes(option)}
                      onCheckedChange={() => handleFilterChange(option)}
                    />
                    <Label htmlFor={option} className="font-normal capitalize">{option}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label>Values</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="ethical-sourcing" 
                  checked={filters.ethical} 
                  onCheckedChange={checked => setFilters(prev => ({ ...prev, ethical: checked }))}
                />
                <Label htmlFor="ethical-sourcing" className="font-normal flex items-center gap-1"><Icons.ethical className="h-4 w-4" /> Ethical Sourcing</Label>
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

        <div className="pt-8">
            <RecommendationsTool nearbyShops={filteredShops} />
        </div>

        <ShopDetails shop={selectedShop} isOpen={!!selectedShop} onOpenChange={(open) => !open && setSelectedShop(null)} />
      </div>
    </section>
  );
}
