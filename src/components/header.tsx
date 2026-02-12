import Link from 'next/link';
import { Icons } from './icons';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 bg-teaware-pattern bg-blend-soft-light backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold">LeafLux</span>
        </Link>
        <nav>
          <Button asChild variant="ghost">
            <Link href="/order">Order Tea</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/about">About</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}