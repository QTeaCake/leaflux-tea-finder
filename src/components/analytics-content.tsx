import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';
import { AnalyticsMap } from './analytics-map';
import { teaShops } from '@/lib/tea-shops';

export function AnalyticsContent() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center mb-12 lg:mb-20">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icons.analytics className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Business Analytics Dashboard
          </h1>
          <p className="max-w-[800px] text-foreground/80 md:text-xl">
            Insights into market opportunities and user engagement trends.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Tea Shop Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This map shows the locations of all currently listed tea shops. Areas with no markers represent potential "tea deserts"—untapped markets with high potential for new businesses.
              </p>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                <AnalyticsMap shops={teaShops} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">User Interest by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This visualization shows where our users are searching from, providing insights into regional demand and brand reach.
              </p>
               <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                <Image
                  src="https://picsum.photos/seed/userinterest/800/450"
                  alt="A map showing user interest locations."
                  fill
                  className="object-cover"
                  data-ai-hint="user locations map"
                />
              </div>
            </CardContent>
          </Card>
           <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Most Praised Offerings & Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Analytics on which shop features, offerings, and user-generated tags are receiving the most positive engagement, indicating consumer preferences.
              </p>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border flex items-center justify-center bg-muted">
                 <p className="text-muted-foreground font-semibold">[Chart showing popular tags and offerings]</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
