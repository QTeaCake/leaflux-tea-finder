import { Icons } from './icons';

export function Footer() {
  return (
    <footer className="bg-primary/80 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <p className="font-headline text-lg font-semibold">LeafLux's Tea Finder</p>
        </div>
        <p className="text-sm text-primary-foreground/80">&copy; {new Date().getFullYear()} LeafLux. All rights reserved.</p>
      </div>
    </footer>
  );
}
