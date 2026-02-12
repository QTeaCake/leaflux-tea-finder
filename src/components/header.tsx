import Link from 'next/link';
import { Icons } from './icons';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold">LeafLux</span>
        </Link>
      </div>
    </header>
  );
}
