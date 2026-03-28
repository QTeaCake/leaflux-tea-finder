'use server';

import { revalidatePath } from 'next/cache';

/**
 * Server action to revalidate a specific path.
 */
export async function revalidatePage(path: string) {
  revalidatePath(path);
}
