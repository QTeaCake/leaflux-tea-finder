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

const getDistanceColorClasses = (distance: number): string => {
  if (distance <= 15) {
    // Green
    return 'bg-green-100 text-green-900 border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-800';
  }
  if (distance <= 50) {
    // Yellow
    return 'bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-200 dark:border-yellow-800';
  }
  // Red
  return 'bg-red-100 text-red-900 border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800';
};


export function ShopCard({ shop, onSelect, onHover, isHovered }: Props) {
  const isSpecial = !!shop.isFeatured;

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl ${isHovered ? 'shadow-xl scale-[1.02] border-primary' : 'shadow-md'} ${isSpecial && !isHovered ? 'shadow-accent/20 shadow-lg' : ''}`}
      onClick={() => onSelect(shop)}
      onMouseEnter={() => onHover(shop.id)}
      onMouseLeave={() => onHover(null)}
    >
      <CardHeader>
        <CardTitle className="font-headline text-xl flex justify-between items-center">
          {shop.name}
          {isSpecial && <Icons.ai className="h-5 w-5 text-accent" />}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Icons.mapPin className="h-4 w-4" />
          {shop.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {shop.distance != null && (
            <Badge className={getDistanceColorClasses(shop.distance)}>{shop.distance.toFixed(1)} miles away</Badge>
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
