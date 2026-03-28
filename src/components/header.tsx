
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const CHAMMY_LOGO_DATA_URI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj4KICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0iIzNkMjA1NSIvPgogIDxwYXRoIGQ9Ik0xMiAyMiBRIDIwIDEwIDI4IDIyIFEgMjAgMzQgMTIgMjIiIGZpbGw9IiNlOGEwYjQiLz4KICA8Y2lyY2xlIGN4PSIxNyIgY3k9IjE5IiByPSIxLjUiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iMjMiIGN5PSIxOSIgcj0iMS41IiBmaWxsPSJ3aGl0ZSIvPgogIDxwYXRoIGQ9Ik0xOCAyNSBRIDIwIDI3IDIyIDI1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 bg-teaware-pattern bg-cover bg-center bg-blend-soft-light backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Back to homepage">
          <Image
            src={CHAMMY_LOGO_DATA_URI}
            alt="QTeaCake Logo"
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
