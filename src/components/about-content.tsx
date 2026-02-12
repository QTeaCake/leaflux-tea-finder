import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Icons } from './icons';

export function AboutContent() {
  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why LeafLux? Our Story.
            </h1>
            <p className="text-foreground/80 md:text-lg">
              My journey into the world of tea began for two simple reasons: to find a healthier alternative to sugary drinks and to carve out moments of peace and meditation in my daily life. Over the years, this simple practice has brought me immense joy and significantly lowered my stress.
            </p>
            <p className="text-foreground/80 md:text-lg">
              The problem I faced, however, was living in what I call a 'tea desert.' To grow my hobby, I had to order all of my loose-leaf tea, teaware, and accessories online, missing out on the community and discovery that only a local shop can provide.
            </p>
             <p className="text-foreground/80 md:text-lg">
              My dream is to change that. LeafLux is my effort to unite tea lovers with authentic shops everywhere and to expose the 'tea deserts' in hopes of cultivating new growth. My sincerest hope is that this tool helps you find wonderful tea shops, deepens your own hobby, and maybe even inspires a few new shops to open where they're needed most.
            </p>
          </div>
          <div className="flex items-center justify-center">
             <Card className="p-4 shadow-lg w-full max-w-md">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/chammy/600/600"
                  alt="The tea-loving mascot for LeafLux, a corpulent bat-like cat."
                  fill
                  className="object-cover"
                  data-ai-hint="cute bat cat mascot"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
