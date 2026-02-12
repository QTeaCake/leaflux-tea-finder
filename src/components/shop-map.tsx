'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { TeaShop } from '@/lib/tea-shops';

type Props = {
  shops: TeaShop[];
  apiKey: string | undefined;
  center: { lat: number; lng: number };
  onSelectShop: (shop: TeaShop) => void;
  onHoverShop: (id: string | null) => void;
  hoveredShopId: string | null;
};

export function ShopMap({ shops, apiKey, center, onSelectShop, onHoverShop, hoveredShopId }: Props) {
  if (!apiKey) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center p-4 text-center">
        <div>
          <h3 className="font-headline text-lg text-muted-foreground">Map Unavailable</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Please provide a Google Maps API key in your environment variables to enable this feature.
          </p>
        </div>
      </div>
    );
  }

  // Colors match the new theme in globals.css
  const primaryColor = '#666699'; // hsl(260, 25%, 50%)
  const accentColor = '#d9a36c';  // hsl(30, 50%, 60%)
  const backgroundColor = '#f7f5f2'; // hsl(45, 30%, 96%)

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        key={`${center.lat}-${center.lng}`}
        mapId="leaf-lux-map"
        style={{ width: '100%', height: '100%' }}
        defaultCenter={center}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {shops.map((shop) => (
          <AdvancedMarker
            key={shop.id}
            position={shop.location}
            onClick={() => onSelectShop(shop)}
            onPointerEnter={() => onHoverShop(shop.id)}
            onPointerLeave={() => onHoverShop(null)}
          >
            <Pin
              background={hoveredShopId === shop.id ? accentColor : primaryColor}
              borderColor={hoveredShopId === shop.id ? primaryColor : accentColor}
              glyphColor={backgroundColor}
            />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
