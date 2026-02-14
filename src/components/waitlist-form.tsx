'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  const db = useFirestore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: WaitlistFormValues) => {
    if (!db) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not available.' });
        return;
    }
    startTransition(() => {
      const waitlistCollection = collection(db, 'waitlistEntries');
      addDoc(waitlistCollection, {
        email: data.email,
        submittedAt: serverTimestamp(),
      })
      .then(() => {
        toast({
          title: 'Success!',
          description: "You've been added to the waitlist.",
        });
        form.reset();

        // Trigger the confirmation email
        const mailCollection = collection(db, 'mail');
        addDoc(mailCollection, {
          to: [data.email],
          message: {
            subject: "You're on the LeafLux Waitlist!",
            html: `
              <p>Hello,</p>
              <p>Thank you for your interest in LeafLux! You've been successfully added to our waitlist.</p>
              <p>We'll notify you as soon as new features, tea discoveries, and events are announced.</p>
              <p>Stay curious,</p>
              <p>The LeafLux Team</p>
            `,
          },
        }).catch(err => {
            console.error("Error sending waitlist confirmation email:", err);
            // We don't show a toast here because the primary action (waitlist signup) was successful.
        });
      })
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: waitlistCollection.path,
          operation: 'create',
          requestResourceData: data,
        });

        toast({
          variant: 'destructive',
          title: 'Signup Failed',
          description: error.message || 'Could not sign up for the waitlist. Please try again later.',
        });
        
        errorEmitter.emit('permission-error', permissionError);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-sm items-start space-x-2"
      >
        <div className="flex-grow">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} disabled={isPending}/>
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
