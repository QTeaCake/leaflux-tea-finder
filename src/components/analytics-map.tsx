'use client';

import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import type { TeaShop } from '@/lib/tea-shops';
import { useEffect, useMemo } from 'react';

type Props = {
  shops: TeaShop[];
  apiKey: string | undefined;
};

// A component to render the heatmap layer
function Heatmap({ shops }: { shops: TeaShop[] }) {
  const map = useMap();
  const heatmapData = useMemo(() => {
    if (typeof window === 'undefined' || !window.google?.maps?.LatLng) {
      return [];
    }
    return shops.map(shop => new google.maps.LatLng(shop.location.lat, shop.location.lng));
  }, [shops]);

  useEffect(() => {
    if (!map || heatmapData.length === 0 || !window.google?.maps?.visualization) return;

    const heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
    });

    const gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    heatmap.set('gradient', gradient);
    heatmap.set('radius', 20);
    heatmap.set('opacity', 0.6);
    heatmap.setMap(map);

    return () => {
      heatmap.setMap(null);
    };
  }, [map, heatmapData]);

  return null;
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
    <APIProvider apiKey={apiKey} libraries={['visualization']}>
      <Map
        mapId="leaf-lux-analytics-map"
        style={{ width: '100%', height: '100%' }}
        defaultCenter={center}
        defaultZoom={4}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <Heatmap shops={shops} />
      </Map>
    </APIProvider>
  );
}
