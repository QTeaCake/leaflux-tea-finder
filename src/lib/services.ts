'use server';

import fs from 'fs/promises';
import path from 'path';

const submissionsPath = path.join(process.cwd(), 'src', 'lib', 'submissions.json');

type WaitlistSubmission = {
  email: string;
  submittedAt: string;
};

type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

type ShopSuggestionSubmission = {
  shopName: string;
  shopLocation: string;
  notes?: string;
  submittedAt: string;
};

type Submissions = {
  waitlist: WaitlistSubmission[];
  contact: ContactSubmission[];
  suggestions: ShopSuggestionSubmission[];
};

async function readSubmissions(): Promise<Submissions> {
  try {
    const data = await fs.readFile(submissionsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty structure
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeSubmissions({ waitlist: [], contact: [], suggestions: [] });
      return { waitlist: [], contact: [], suggestions: [] };
    }
    console.error('Error reading submissions file:', error);
    throw new Error('Could not read submissions.');
  }
}

async function writeSubmissions(submissions: Submissions) {
  try {
    await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing submissions file:', error);
    throw new Error('Could not save submission.');
  }
}

export async function addWaitlistSubmission(email: string) {
  const submissions = await readSubmissions();
  submissions.waitlist.unshift({ email, submittedAt: new Date().toISOString() });
  await writeSubmissions(submissions);
}

export async function addContactSubmission(data: { name: string; email: string; message: string }) {
  const submissions = await readSubmissions();
  submissions.contact.unshift({ ...data, submittedAt: new Date().toISOString() });
  await writeSubmissions(submissions);
}

export async function addShopSuggestionSubmission(data: { shopName: string; shopLocation: string; notes?: string }) {
  const submissions = await readSubmissions();
  submissions.suggestions.unshift({ ...data, submittedAt: new Date().toISOString() });
  await writeSubmissions(submissions);
}

export async function getSubmissions(): Promise<Submissions> {
  return readSubmissions();
}
