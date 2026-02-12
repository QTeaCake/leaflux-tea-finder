import type { TeaShop } from '@/lib/tea-shops';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';
import { Separator } from './ui/separator';

type Props = {
  shop: TeaShop;
  onSelect: (shop: TeaShop) => void;
  onHover: (id: string | null) => void;
  isHovered: boolean;
};

export function ShopCard({ shop, onSelect, onHover, isHovered }: Props) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl ${isHovered ? 'shadow-xl scale-[1.02] border-primary' : 'shadow-md'}`}
      onClick={() => onSelect(shop)}
      onMouseEnter={() => onHover(shop.id)}
      onMouseLeave={() => onHover(null)}
    >
      <CardHeader>
        <CardTitle className="font-headline text-xl">{shop.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Icons.mapPin className="h-4 w-4" />
          {shop.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {shop.distance != null && (
            <Badge variant="outline">{shop.distance.toFixed(1)} miles away</Badge>
        )}
        {shop.ethical && (
          <Badge variant="secondary" className="flex items-center gap-1 w-fit">
            <Icons.ethical className="h-3 w-3" />
            Ethical Sourcing
          </Badge>
        )}
        <Separator />
        <div className="flex flex-wrap gap-2">
          {shop.offerings.map(offering => (
            <Badge key={offering} variant="default" className="capitalize bg-primary/80">
              {offering}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
