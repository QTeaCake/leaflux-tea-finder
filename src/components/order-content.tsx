import { Icons } from './icons';

export function OrderContent() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icons.order className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Order Tea Online - Coming Soon!
          </h1>
          <p className="max-w-[800px] text-foreground/80 md:text-xl">
            Soon, you'll be able to order directly from a curated selection of our partner tea shops, bringing their finest offerings right to your doorstep.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start p-6 rounded-lg border bg-card">
            <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
              <Icons.store className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2">Support Local Shops</h3>
            <p className="text-muted-foreground">
              By ordering through LeafLux, you'll be using affiliate links that directly support the authentic, local tea shops you discover on our map. It's a great way to fuel your hobby while strengthening the tea community.
            </p>
          </div>
          <div className="flex flex-col items-start p-6 rounded-lg border bg-card">
            <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
              <Icons.wind className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2">Faster, Cheaper Shipping</h3>
            <p className="text-muted-foreground">
              Why wait for cross-country shipments? Ordering from shops closer to you means your tea arrives faster and often with lower shipping costs. Get your perfect steep without the wait.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}