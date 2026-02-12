import Image from 'next/image';
import type { TeaShop, Offering } from '@/lib/tea-shops';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type Props = {
  shop: TeaShop | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onVote: (shopId: string, offering: Offering) => void;
};

export function ShopDetails({ shop, isOpen, onOpenChange, onVote }: Props) {
  if (!shop) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-card">
        <SheetHeader>
          <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
            <Image
              src={`https://picsum.photos/seed/${shop.id}/600/400`}
              alt={`A photo of ${shop.name}`}
              fill
              className="object-cover"
              data-ai-hint="tea shop interior"
            />
          </div>
          <SheetTitle className="font-headline text-3xl">{shop.name}</SheetTitle>
          <SheetDescription className="flex items-center gap-2 pt-1 !mt-0">
            <Icons.mapPin className="h-4 w-4" />
            {shop.address}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <h3 className="font-headline text-lg">Offerings</h3>
            <div className="flex flex-wrap gap-3">
              {shop.offerings.map(offering => (
                <div key={offering} className="flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 pl-3 pr-1 py-1 text-sm transition-shadow hover:shadow-md">
                   <span className="capitalize font-medium text-foreground">{offering}</span>
                   <Badge variant="secondary" className="text-xs pointer-events-none">
                     {shop.offeringVotes?.[offering] || 0}
                   </Badge>
                   <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 rounded-full"
                    onClick={() => onVote(shop.id, offering)}
                    aria-label={`Add vote for ${offering}`}
                  >
                    <Icons.plusCircle className="h-4 w-4 text-primary hover:text-accent" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {shop.ethical && (
            <div className="flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 p-3">
              <Icons.ethical className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold">Ethical Sourcing</h4>
                <p className="text-sm text-muted-foreground">This shop is committed to ethical and fair trade practices.</p>
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-headline text-lg">Contact & More Info</h3>
            <p className="text-muted-foreground">{shop.contact.phone}</p>
            <Button asChild variant="link" className="p-0 h-auto">
              <a href={shop.contact.website} target="_blank" rel="noopener noreferrer">{shop.contact.website}</a>
            </Button>
          </div>

          <Button asChild className="w-full">
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${shop.location.lat},${shop.location.lng}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </Button>

        </div>
      </SheetContent>
    </Sheet>
  );
}
