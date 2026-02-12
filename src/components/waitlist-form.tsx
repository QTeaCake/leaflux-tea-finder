'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

import { signUpForWaitlist } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Icons } from './icons';

const waitlistSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export function WaitlistForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(signUpForWaitlist, null);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      form.reset();
    }
    if (state?.errors?.email) {
      form.setError('email', { type: 'server', message: state.errors.email[0] });
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={form.handleSubmit(() => form.trigger().then(isValid => isValid && formAction(new FormData(form.control._formValues.current))))}
        className="flex w-full max-w-sm items-start space-x-2"
      >
        <div className="flex-grow">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" aria-disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            'Join'
          )}
        </Button>
      </form>
    </Form>
  );
}
