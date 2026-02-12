import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/header';
import { TeaFinder } from '@/components/tea-finder';
import { WaitlistForm } from '@/components/waitlist-form';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-tea-plantation');

  return (
    <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-primary-foreground">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
          Find Your Perfect Steep
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-medium" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
          Discover authentic local tea shops and get personalized recommendations for your next favorite brew.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <TeaFinder />
        <div className="w-full bg-background py-12 md:py-20">
          <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-3xl flex items-center gap-2">
                  <Icons.list className="h-8 w-8 text-primary" />
                  Join the Waitlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Be the first to know about new features, exclusive tea discoveries, and upcoming events. Sign up for our waitlist!
                </p>
                <WaitlistForm />
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-3xl flex items-center gap-2">
                  <Icons.mail className="h-8 w-8 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Have a question, feedback, or a tea shop suggestion? We'd love to hear from you.
                </p>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
