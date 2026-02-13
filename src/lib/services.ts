'use server';

import fs from 'fs/promises';
import path from 'path';

const submissionsPath = path.join(process.cwd(), 'src', 'lib', 'submissions.json');
const analyticsPath = path.join(process.cwd(), 'src', 'lib', 'analytics.json');

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

type AnalyticsData = {
  shopClicks: Record<string, number>;
  teaTypeClicks: Record<string, number>;
  offeringClicks: Record<string, number>;
  ethicalClicks: number;
  websiteClicks: Record<string, number>;
  directionsClicks: Record<string, number>;
  locationSearches: Record<string, number>;
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

async function readAnalyticsData(): Promise<AnalyticsData> {
  try {
    const data = await fs.readFile(analyticsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      const initialData: AnalyticsData = {
        shopClicks: {}, teaTypeClicks: {}, offeringClicks: {},
        ethicalClicks: 0, websiteClicks: {}, directionsClicks: {},
        locationSearches: {}
      };
      await writeAnalyticsData(initialData);
      return initialData;
    }
    console.error('Error reading analytics file:', error);
    throw new Error('Could not read analytics.');
  }
}

async function writeAnalyticsData(data: AnalyticsData) {
  try {
    await fs.writeFile(analyticsPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing analytics file:', error);
    throw new Error('Could not save analytics data.');
  }
}

export async function logAnalyticsClick(type: 'shop' | 'teaType' | 'offering' | 'ethical' | 'website' | 'directions' | 'location', value: string) {
    const data = await readAnalyticsData();

    switch (type) {
        case 'shop':
            data.shopClicks[value] = (data.shopClicks[value] || 0) + 1;
            break;
        case 'teaType':
            data.teaTypeClicks[value] = (data.teaTypeClicks[value] || 0) + 1;
            break;
        case 'offering':
            data.offeringClicks[value] = (data.offeringClicks[value] || 0) + 1;
            break;
        case 'ethical':
            data.ethicalClicks = (data.ethicalClicks || 0) + 1;
            break;
        case 'website':
            data.websiteClicks[value] = (data.websiteClicks[value] || 0) + 1;
            break;
        case 'directions':
            data.directionsClicks[value] = (data.directionsClicks[value] || 0) + 1;
            break;
        case 'location':
            const locationKey = value.toLowerCase().trim();
            if(locationKey) data.locationSearches[locationKey] = (data.locationSearches[locationKey] || 0) + 1;
            break;
    }

    await writeAnalyticsData(data);
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
    return readAnalyticsData();
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
