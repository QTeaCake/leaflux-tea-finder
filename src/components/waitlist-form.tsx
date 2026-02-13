'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
  const [state, formAction, isPending] = useActionState(signUpForWaitlist, null);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    if (!state) return;

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
          title: 'Signup Failed',
          description: state.errors._form[0],
        });
      } else if (state.errors.email) {
        form.setError('email', { type: 'server', message: state.errors.email[0] });
      }
    }
  }, [state, toast, form]);

  const processForm = (data: WaitlistFormValues) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formAction(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
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
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            'Join'
          )}
        </Button>
      </form>
    </Form>
  );
}
