import Image from 'next/image';
import { useState } from 'react';
import type { TeaShop } from '@/lib/tea-shops';
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
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PraiseButton } from './praise-button';
import { logAnalyticsClick } from '@/app/actions';

type Props = {
  shop: TeaShop | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPraise: (shopId: string) => void;
  onAddTag: (shopId: string, tag: string) => void;
  praisedShops: string[];
};

export function ShopDetails({ shop, isOpen, onOpenChange, onPraise, onAddTag, praisedShops }: Props) {
  const [newTag, setNewTag] = useState('');

  if (!shop) return null;

  const handleAddTagClick = () => {
    if (newTag.trim() && shop) {
      onAddTag(shop.id, newTag.trim());
      setNewTag(''); // Clear input after adding
    }
  };

  const isPraised = praisedShops.includes(shop.id);

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
          <div className="flex justify-between items-start">
            <SheetTitle className="font-headline text-3xl">{shop.name}</SheetTitle>
            <PraiseButton
              shopId={shop.id}
              onPraise={onPraise}
              isPraised={isPraised}
            />
          </div>
          <SheetDescription className="flex items-center gap-2 pt-1 !mt-0">
            <Icons.mapPin className="h-4 w-4" />
            {shop.address}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-headline text-lg">Offerings, Types & Tags</h3>
            <div className="flex flex-wrap gap-2">
              {shop.offerings.map(offering => (
                <Badge key={offering} variant="default" className="capitalize">
                  {offering}
                </Badge>
              ))}
              {shop.teaTypes?.map(type => (
                <Badge key={type} variant="secondary" className="capitalize">
                  {type}
                </Badge>
              ))}
              {shop.userTags?.map(tag => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
             <div className="space-y-2 pt-4">
                <Label htmlFor="add-tag-input" className="text-xs text-muted-foreground">Suggest a new tag</Label>
                <div className="flex items-center gap-2">
                    <Input 
                        id="add-tag-input"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="e.g., 'cozy' or 'good for study'"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTagClick();
                            }
                        }}
                    />
                    <Button size="icon" onClick={handleAddTagClick} disabled={!newTag.trim()} aria-label="Add Tag">
                        <Icons.plusCircle className="h-5 w-5" />
                    </Button>
                </div>
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
              <a 
                href={shop.contact.website} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => logAnalyticsClick('website', shop.id)}
              >
                {shop.contact.website}
              </a>
            </Button>
          </div>

          <Button asChild className="w-full">
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${shop.location.lat},${shop.location.lng}`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => logAnalyticsClick('directions', shop.id)}
            >
              Get Directions
            </a>
          </Button>

        </div>
      </SheetContent>
    </Sheet>
  );
}
