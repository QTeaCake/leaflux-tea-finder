import type { TeaShop } from '@/lib/tea-shops';
import { ShopCard } from './shop-card';

type Props = {
  shops: TeaShop[];
  onSelectShop: (shop: TeaShop) => void;
  onHoverShop: (id: string | null) => void;
  hoveredShopId: string | null;
};

export function ShopList({ shops, onSelectShop, onHoverShop, hoveredShopId }: Props) {
  if (shops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-background rounded-lg">
        <h3 className="font-headline text-xl">No Shops Found</h3>
        <p className="text-muted-foreground mt-2">Try expanding your search radius or changing your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {shops.map(shop => (
        <ShopCard 
          key={shop.id} 
          shop={shop} 
          onSelect={onSelectShop}
          onHover={onHoverShop}
          isHovered={hoveredShopId === shop.id}
        />
      ))}
    </div>
  );
}
