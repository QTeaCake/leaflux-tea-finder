// @ts-nocheck
'use server';

import { z } from 'zod';
import { addWaitlistSubmission, addContactSubmission, addShopSuggestionSubmission } from '@/lib/services';

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

  try {
    await addWaitlistSubmission(validatedFields.data.email);
    return {
      message: 'Thank you for joining the waitlist!',
    };
  } catch (error) {
    return {
      errors: { _form: ['Could not save submission. Please try again.'] },
    };
  }
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

  try {
    await addContactSubmission(validatedFields.data);
    return {
      message: 'Thank you for your message! We will get back to you soon.',
    };
  } catch (error) {
    return {
      errors: { _form: ['Could not save submission. Please try again.'] },
    };
  }
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

  try {
    await addShopSuggestionSubmission(validatedFields.data);
    return {
      message: 'Thank you for your suggestion! It will be reviewed shortly.',
    };
  } catch (error) {
    return {
      errors: { _form: ['Could not save submission. Please try again.'] },
    };
  }
}
