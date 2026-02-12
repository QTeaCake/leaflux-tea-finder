import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';

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
                This heatmap will visualize tea shop density, highlighting saturated markets ('tea oases') versus untapped markets ('tea deserts'). This is where opportunity lies.
              </p>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border flex items-center justify-center bg-muted">
                 <p className="text-muted-foreground font-semibold">[Work in Progress: Competition Heatmap]</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">User Interest by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This map will show where our users are searching from, providing insights into regional demand and brand reach.
              </p>
               <div className="relative aspect-video w-full rounded-lg overflow-hidden border flex items-center justify-center bg-muted">
                 <p className="text-muted-foreground font-semibold">[Work in Progress: Demand Heatmap]</p>
              </div>
            </CardContent>
          </Card>
           <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Most Praised Offerings & Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This chart will show which shop features, offerings, and user-generated tags are receiving the most positive engagement, indicating key consumer preferences.
              </p>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border flex items-center justify-center bg-muted">
                 <p className="text-muted-foreground font-semibold">[Work in Progress: Consumer Preference Chart]</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
