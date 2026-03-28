
import { WaitlistForm } from '@/components/waitlist-form';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';
import { SuggestShopForm } from './suggest-shop-form';
import { AnalyticsGate } from './analytics-gate';
import { SubmissionsGate } from './submissions-gate';
import { Button } from './ui/button';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div id="contact-section" className="w-full bg-background py-12 md:py-20 border-t">
        <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-3 lg:gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl flex items-center gap-2 text-foreground">
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
              <CardTitle className="font-headline text-3xl flex items-center gap-2 text-foreground">
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
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl flex items-center gap-2 text-foreground">
                <Icons.store className="h-8 w-8 text-primary" />
                Suggest a Shop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Know a hidden gem? Add a missing tea shop to our map. All suggestions are reviewed before being added.
              </p>
              <SuggestShopForm />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
        <div className="flex items-center gap-2">
          <Image
            src="/chammy-logo.png"
            alt="QTeaCake mascot Chammy"
            width={24}
            height={24}
            className="rounded-full brightness-0 invert"
          />
          <p className="font-headline text-lg font-semibold">QTeaCake</p>
        </div>
        <div className="flex items-center gap-4">
          <SubmissionsGate>
            <Button variant="ghost" size="sm" className="hover:bg-primary-foreground hover:text-primary">
              Submissions
            </Button>
          </SubmissionsGate>
          <AnalyticsGate>
            <Button variant="ghost" size="sm" className="hover:bg-primary-foreground hover:text-primary">
              For Business
            </Button>
          </AnalyticsGate>
          <p className="text-sm text-primary-foreground/80">&copy; 2026 QTeaCake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
