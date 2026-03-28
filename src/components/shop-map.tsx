'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { TeaShop } from '@/lib/tea-shops';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Icons } from './icons';

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
        <div className="space-y-2">
          <h3 className="font-headline text-lg text-muted-foreground">Map Configuration Required</h3>
          <p className="text-sm text-muted-foreground">
            Please provide a Google Maps API key in your <code>.env</code> file.
          </p>
        </div>
      </div>
    );
  }

  const primaryColor = '#A8B893'; // Sage Green
  const accentColor = '#9966cc';  // Magical Purple
  const borderColor = '#3a2d1f'; // Dark Brown
  const glyphColor = '#FFFFFF'; // White

  return (
    <div className="relative w-full h-full">
      <APIProvider 
        apiKey={apiKey}
      >
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
      
      {/* Visual Troubleshooting Hint Overlay */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
        <Alert className="bg-background/90 backdrop-blur pointer-events-auto border-accent/50 text-xs py-2 shadow-lg">
          <Icons.ai className="h-3 w-3 text-accent" />
          <AlertTitle className="text-[10px] font-bold">Map Issue?</AlertTitle>
          <AlertDescription className="text-[10px]">
            If the map shows "For development purposes only" or fails to load, ensure <strong>Billing</strong> is active and <strong>Maps JavaScript API</strong> is enabled in the Google Cloud Console.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
