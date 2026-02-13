'use client';

import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { submitShopSuggestion } from '@/app/actions';
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
  const [state, formAction] = useActionState(submitShopSuggestion, null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SuggestShopFormValues>({
    resolver: zodResolver(suggestShopSchema),
    defaultValues: {
      shopName: '',
      shopLocation: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (!state) return;
    
    setIsSubmitting(false);

    if (state.message) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      form.reset();
    } else if (state.errors) {
       if (state.errors._form) {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: state.errors._form[0],
        });
      } else {
        Object.entries(state.errors).forEach(([key, value]) => {
          form.setError(key as keyof SuggestShopFormValues, {
            type: 'server',
            message: (value as string[])[0],
          });
        });
      }
    }
  }, [state, toast, form]);

  const processForm = (data: SuggestShopFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('shopName', data.shopName);
    formData.append('shopLocation', data.shopLocation);
    formData.append('notes', data.notes || '');
    formAction(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tea Shop Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Cozy Cup" {...field} />
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
                <Input placeholder="123 Tea Lane or www.teashop.com" {...field} />
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
                <Textarea placeholder="What makes this shop special?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
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
