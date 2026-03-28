'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Icons } from './icons';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    if (!db) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not available.' });
        return;
    }
    startTransition(() => {
      const feedbackCollection = collection(db, 'feedbackSubmissions');
      addDoc(feedbackCollection, {
        ...data,
        submittedAt: serverTimestamp(),
      })
      .then(() => {
        toast({
          title: 'Success!',
          description: "Your message has been sent.",
        });
        form.reset();

        const mailCollection = collection(db, 'mail');
        
        // Confirmation email to the user
        addDoc(mailCollection, {
            to: [data.email],
            message: {
                subject: "We've Received Your Message | QTeaCake",
                html: `
                    <p>Hello ${data.name},</p>
                    <p>Thank you for contacting us! We've received your message and will get back to you as soon as possible.</p>
                    <br>
                    <p><strong>Your message:</strong></p>
                    <p><em>${data.message}</em></p>
                    <br>
                    <p>Best regards,</p>
                    <p>The QTeaCake Team</p>
                `,
            },
        }).catch(err => {
            console.error("Error sending contact form confirmation email:", err);
        });

        // Notification email to the admin
        if (process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            addDoc(mailCollection, {
                to: [process.env.NEXT_PUBLIC_ADMIN_EMAIL],
                message: {
                    subject: `New Contact Submission from ${data.name}`,
                    html: `
                        <p>You've received a new contact form submission.</p>
                        <ul>
                            <li><strong>Name:</strong> ${data.name}</li>
                            <li><strong>Email:</strong> ${data.email}</li>
                        </ul>
                        <p><strong>Message:</strong></p>
                        <p>${data.message}</p>
                    `
                }
            }).catch(err => {
                console.error("Error sending admin notification email for contact form:", err);
            });
        }
      })
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: feedbackCollection.path,
          operation: 'create',
          requestResourceData: data,
        });

        errorEmitter.emit('permission-error', permissionError);
      });
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </Form>
  );
}
