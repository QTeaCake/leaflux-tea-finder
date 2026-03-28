import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 bg-teaware-pattern bg-cover bg-center bg-blend-soft-light backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Back to homepage">
          <Image
            src="/chammy-logo.png"
            alt="QTeaCake mascot Chammy"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-headline text-2xl font-bold text-primary">QTeaCake</span>
        </Link>
        <nav>
          <Button asChild variant="ghost">
            <Link href="/order">Order Tea</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/tea-education">Tea Guide</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/about">About</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
