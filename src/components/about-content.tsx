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
            <div className="flex items-center gap-4">
                <Icons.logo className="h-8 w-8 text-primary" />
                <p className="font-headline text-xl text-muted-foreground">
                    Fueled by tea, inspired by a batcat.
                </p>
            </div>
            <p className="text-foreground/80 md:text-lg">
              LeafLux was born from a simple, yet profound, love for tea. Not the dusty bags found in supermarket aisles, but the rich, authentic, and diverse world of loose-leaf tea. I found myself on a quest, constantly searching for those hidden gems—small, passionate shops dedicated to the art of the perfect brew.
            </p>
            <p className="text-foreground/80 md:text-lg">
              It was a frustrating journey, filled with endless searching and missed opportunities. I knew there had to be a better way to connect fellow tea lovers with the places that would truly ignite their passion.
            </p>
             <p className="text-foreground/80 md:text-lg">
              And that's where Chammy comes in.
            </p>
          </div>
          <div className="flex items-center justify-center">
             <Card className="p-4 shadow-lg w-full max-w-md">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/chammy/600/600"
                  alt="Chammy, the corpulent batcat mascot who loves tea"
                  fill
                  className="object-cover"
                  data-ai-hint="cute bat cat mascot"
                />
              </div>
            </Card>
          </div>
        </div>
         <div className="mt-16 space-y-4">
            <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl text-center">Meet Chammy, Our Spirit Animal</h2>
            <p className="max-w-3xl mx-auto text-center text-foreground/80 md:text-lg">
               Chammy, the corpulent batcat with a penchant for chamomile, is the heart and soul of LeafLux. She represents the cozy, joyful, and slightly quirky moments that a good cup of tea can bring. She's a reminder that tea is more than just a drink; it's a comforting ritual, a moment of peace, and a delightful indulgence. Our mission is to help you find your own "Chammy moment" by discovering the perfect tea shop near you.
            </p>
         </div>
      </div>
    </section>
  );
}
