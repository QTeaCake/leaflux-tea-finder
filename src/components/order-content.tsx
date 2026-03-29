'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { affiliateProducts, type AffiliateTeaType, type AffiliateProduct } from '@/lib/affiliate-products';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ALL = 'all' as const;

const typeLabels: Record<AffiliateTeaType | 'all', string> = {
  all: 'All',
  black: 'Black',
  green: 'Green',
  oolong: 'Oolong',
  white: 'White',
  puerh: 'Puerh',
  matcha: 'Matcha',
  herbal: 'Herbal',
  chai: 'Chai',
  teaware: 'Teaware',
  sampler: 'Samplers',
};

function ProductCard({ product, onShopClick }: { product: AffiliateProduct; onShopClick: (id: string) => void }) {
  return (
    <Card className="flex flex-col overflow-hidden border-primary/10 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-primary-foreground text-xs">Featured</Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-headline text-lg leading-tight">{product.name}</CardTitle>
          <span className="text-primary font-bold text-lg shrink-0">{product.price}</span>
        </div>
        <p className="text-xs text-muted-foreground">{product.vendor}</p>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-sm text-foreground/70">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" onClick={() => onShopClick(product.id)}>
          <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
            Shop Now →
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function OrderContent() {
  const [activeFilter, setActiveFilter] = useState<AffiliateTeaType | 'all'>(ALL);
  const db = useFirestore();

  const logClick = (productId: string) => {
    if (!db) return;
    addDoc(collection(db, 'analyticsEvents'), {
      type: 'affiliateClick',
      value: productId,
      timestamp: serverTimestamp(),
    }).catch(() => {});
  };

  const typesInUse = [ALL, ...Array.from(new Set(affiliateProducts.map(p => p.teaType)))] as (AffiliateTeaType | 'all')[];

  const filtered = activeFilter === ALL
    ? affiliateProducts
    : affiliateProducts.filter(p => p.teaType === activeFilter);

  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">

        <div className="max-w-2xl mb-12">
          <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-3">Shop Tea Online</p>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Quality Tea, Delivered
          </h1>
          <p className="text-foreground/70 text-lg">
            Can't find a shop nearby? These are teas and vendors worth ordering from — curated for enthusiasts.
            Purchasing through these links supports QTeaCake.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {typesInUse.map(type => (
            <Button
              key={type}
              variant={activeFilter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(type)}
            >
              {typeLabels[type]}
            </Button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onShopClick={logClick} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No products in this category yet.</p>
        )}

        <div className="mt-20 border border-primary/20 rounded-xl p-8 max-w-2xl">
          <h3 className="font-headline text-2xl font-bold mb-2">Are you a tea vendor?</h3>
          <p className="text-muted-foreground mb-4">
            Interested in reaching a dedicated community of tea enthusiasts? Get in touch about being featured here.
          </p>
          <Button asChild variant="outline">
            <Link href="/#contact-section">Contact Us</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
