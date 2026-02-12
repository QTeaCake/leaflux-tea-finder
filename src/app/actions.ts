// @ts-nocheck
'use server';

import { z } from 'zod';

const waitlistSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export async function signUpForWaitlist(prevState: any, formData: FormData) {
  const validatedFields = waitlistSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate saving to a database
  console.log('New waitlist signup:', validatedFields.data.email);

  return {
    message: 'Thank you for joining the waitlist!',
  };
}

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate sending an email or saving to a database
  console.log('New contact form submission:', validatedFields.data);

  return {
    message: 'Thank you for your message! We will get back to you soon.',
  };
}

const suggestShopSchema = z.object({
  shopName: z.string().min(2, { message: 'Shop name must be at least 2 characters.' }),
  shopLocation: z.string().min(10, { message: 'Please provide an address or website.' }),
  notes: z.string().optional(),
});

export async function submitShopSuggestion(prevState: any, formData: FormData) {
  const validatedFields = suggestShopSchema.safeParse({
    shopName: formData.get('shopName'),
    shopLocation: formData.get('shopLocation'),
    notes: formData.get('notes'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate saving to a database for review
  console.log('New shop suggestion:', validatedFields.data);

  return {
    message: 'Thank you for your suggestion! It will be reviewed shortly.',
  };
}
