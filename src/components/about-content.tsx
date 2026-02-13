import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';
import { Button } from './ui/button';

export function AboutContent() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center mb-12 lg:mb-20">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Cultivating a Global Tea Community
          </h1>
          <p className="max-w-[800px] text-foreground/80 md:text-xl">
            LeafLux is more than just an app; it's a movement to connect authentic tea purveyors with a passionate community, turning 'tea deserts' into thriving oases.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-center mb-16 lg:mb-24">
          <div className="lg:col-span-3 space-y-4">
            <h2 className="font-headline text-3xl font-bold">Our Origin Story</h2>
            <p className="text-foreground/80 md:text-lg">
              The journey to LeafLux began with a personal quest for mindfulness and a healthier lifestyle, found in the simple ritual of brewing tea. This daily practice brought immense joy and lowered stress, but a significant hurdle remained: living in a 'tea desert.'
            </p>
            <p className="text-foreground/80 md:text-lg">
              The founder's passion was hampered by a lack of local access to quality loose-leaf tea and teaware, forcing a reliance on impersonal online orders. This experience sparked a powerful idea: what if there was a way to bridge the gap between tea lovers and the authentic, local shops that are the heart of the tea community?
            </p>
          </div>
          <div className="lg:col-span-2 flex items-center justify-center">
             <Card className="p-4 shadow-lg w-full max-w-xs">
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

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="flex flex-col p-6 bg-card">
            <CardHeader className="p-0 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                 <Icons.problem className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">The Problem</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <p className="text-muted-foreground">
                Passionate tea enthusiasts in many areas—"tea deserts"—are disconnected from the authentic tea experience. They lack local access to specialty shops, forcing them to miss out on community, discovery, and expert guidance.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col p-6 bg-card border-accent shadow-accent/20 shadow-lg">
            <CardHeader className="p-0 mb-4">
              <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                <Icons.solution className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="font-headline text-2xl">Our Solution</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
               <p className="text-muted-foreground">
                LeafLux is a discovery platform that intelligently maps authentic tea shops. We empower users to find nearby gems, filter by specific offerings, and receive AI-powered recommendations, bridging the gap between hobbyists and vendors.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col p-6 bg-card">
            <CardHeader className="p-0 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Icons.vision className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">The Vision</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <p className="text-muted-foreground">
                Our vision extends beyond a map. We aim to elevate global tea knowledge, demystifying the rich world of tea—from oolongs to rooibos, gaiwans to matcha. By building the definitive directory for tea shops and exposing 'tea deserts,' we will not only connect communities but also foster a deeper appreciation for this ancient craft, inspiring new shops to open and new hobbyists to begin their journey.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 lg:mt-24 max-w-4xl mx-auto">
          <Card className="text-center shadow-lg p-6 lg:p-8 border-accent/50 bg-card">
            <CardHeader className="p-0 items-center">
              <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                  <Icons.handshake className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="font-headline text-3xl">Join Our Journey</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto md:text-lg">
                We're actively seeking passionate individuals and businesses to help us grow. Whether you're a tea vendor interested in a partnership, a developer with a passion for community-driven apps, or an enthusiast with great ideas, we want to hear from you.
              </p>
              <Button asChild size="lg">
                  <Link href="/#contact-section">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
