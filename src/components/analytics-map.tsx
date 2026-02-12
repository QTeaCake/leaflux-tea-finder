'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { TeaShop } from '@/lib/tea-shops';
import { Circle } from 'lucide-react';

type Props = {
  shops: TeaShop[];
  apiKey: string | undefined;
};

// A simplified, non-interactive marker for the analytics map
function DataPointMarker() {
    return (
        <div className="relative">
            <Circle className="h-3 w-3 text-primary fill-primary/50" />
        </div>
    );
}


export function AnalyticsMap({ shops, apiKey }: Props) {
  if (!apiKey) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center p-4 text-center">
        <div>
          <h3 className="font-headline text-lg text-muted-foreground">Map Unavailable</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Please provide a Google Maps API key to view analytics.
          </p>
        </div>
      </div>
    );
  }

  // Center the map on the continental US
  const center = { lat: 39.8283, lng: -98.5795 };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId="leaf-lux-analytics-map"
        style={{ width: '100%', height: '100%' }}
        defaultCenter={center}
        defaultZoom={4}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {shops.map((shop) => (
          <AdvancedMarker
            key={shop.id}
            position={shop.location}
          >
            <DataPointMarker />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
