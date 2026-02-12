'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalizeTeaRecommendations, PersonalizeTeaRecommendationsOutput } from '@/ai/flows/personalized-tea-recommendations';
import type { TeaShop } from '@/lib/tea-shops';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Icons } from './icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const recommendationsSchema = z.object({
  preferences: z.string().min(20, 'Please describe your preferences in a bit more detail (at least 20 characters).'),
});

type RecommendationsFormValues = z.infer<typeof recommendationsSchema>;

type Props = {
  nearbyShops: TeaShop[];
};

export function RecommendationsTool({ nearbyShops }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<PersonalizeTeaRecommendationsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<RecommendationsFormValues>({
    resolver: zodResolver(recommendationsSchema),
    defaultValues: { preferences: '' },
  });

  const onSubmit = async (data: RecommendationsFormValues) => {
    if (nearbyShops.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Shops Found',
        description: 'Please find some nearby tea shops before getting recommendations.',
      });
      return;
    }

    setIsLoading(true);
    setRecommendations(null);

    try {
      const result = await personalizeTeaRecommendations({
        userPreferences: data.preferences,
        nearbyTeaShops: nearbyShops.map(shop => ({
          name: shop.name,
          address: shop.address,
          offerings: shop.offerings,
          ethicalSourcing: shop.ethical,
          description: shop.name, // Simplified for the AI
        })),
      });
      setRecommendations(result);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate recommendations. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetFlow = () => {
    setRecommendations(null);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Icons.ai className="mr-2 h-5 w-5" />
          Get Personalized Tea Recommendations
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
             <Icons.ai className="h-6 w-6 text-primary" />
            Personal Tea Sommelier
          </DialogTitle>
          <DialogDescription>
            {recommendations ? "Here are your personalized tea recommendations." : "Describe your tea preferences, and our AI sommelier will suggest the perfect brew for you from nearby shops." }
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <Icons.spinner className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Crafting your recommendations...</p>
          </div>
        ) : recommendations ? (
          <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">Justification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{recommendations.justification}</p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Recommended Teas</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {recommendations.recommendedTeaTypes.map(tea => <Badge key={tea} variant="secondary">{tea}</Badge>)}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Brewing Methods</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {recommendations.recommendedBrewingMethods.map(method => <Badge key={method} variant="secondary">{method}</Badge>)}
                </CardContent>
              </Card>
            </div>
             {recommendations.recommendedLocalTeaEvents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Local Events & Classes</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {recommendations.recommendedLocalTeaEvents.map(event => <Badge key={event} variant="secondary">{event}</Badge>)}
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Tea Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="e.g., 'I enjoy light, floral white teas, but I'm curious about smoky oolongs. I prefer a simple brewing process and value ethically sourced products.'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Generate Recommendations
              </Button>
            </form>
          </Form>
        )}
        <DialogFooter>
           <Button variant="ghost" onClick={() => { resetFlow(); setIsOpen(false) }}>Close</Button>
           {recommendations && <Button onClick={resetFlow}>Start Over</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
