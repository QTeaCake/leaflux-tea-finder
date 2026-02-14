'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Icons } from './icons';

const suggestShopSchema = z.object({
  shopName: z.string().min(2, { message: 'Shop name must be at least 2 characters.' }),
  shopLocation: z.string().min(10, { message: 'Please provide an address or website.' }),
  notes: z.string().optional(),
});

type SuggestShopFormValues = z.infer<typeof suggestShopSchema>;

export function SuggestShopForm() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SuggestShopFormValues>({
    resolver: zodResolver(suggestShopSchema),
    defaultValues: {
      shopName: '',
      shopLocation: '',
      notes: '',
    },
  });

  const onSubmit = (data: SuggestShopFormValues) => {
    if (!db) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not available.' });
        return;
    }
    startTransition(async () => {
      try {
        await addDoc(collection(db, 'shopSuggestionSubmissions'), {
          ...data,
          submittedAt: serverTimestamp(),
        });
        toast({
          title: 'Success!',
          description: 'Thank you for your suggestion!',
        });
        form.reset();
      } catch (error: any) {
        console.error('Shop suggestion error:', error);
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: error.message || 'An unexpected error occurred.',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tea Shop Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Cozy Cup" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shopLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address or Website</FormLabel>
              <FormControl>
                <Input placeholder="123 Tea Lane or www.teashop.com" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="What makes this shop special?" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit for Review'
          )}
        </Button>
      </form>
    </Form>
  );
}
