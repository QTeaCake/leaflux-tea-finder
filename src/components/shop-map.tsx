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

  const primaryColor = '#A8B893'; // Sage Green
  const accentColor = '#B87333';  // Bronze
  const borderColor = '#3a2d1f'; // Dark Brown
  const glyphColor = '#FFFFFF'; // White

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
              borderColor={borderColor}
              glyphColor={glyphColor}
            />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
