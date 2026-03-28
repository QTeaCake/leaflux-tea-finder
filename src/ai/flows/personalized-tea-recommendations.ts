'use server';
/**
 * @fileOverview A flow for providing personalized tea recommendations via Claude.
 *
 * - personalizeTeaRecommendations - A function that generates personalized tea recommendations.
 * - PersonalizeTeaRecommendationsInput - The input type for the personalizeTeaRecommendations function.
 * - PersonalizeTeaRecommendationsOutput - The return type for the personalizeTeaRecommendations function.
 */

import { anthropic } from '@/ai/genkit';
import { z } from 'zod';

const TeaShopSchema = z.object({
  name: z.string(),
  address: z.string(),
  offerings: z.array(z.string()),
  ethicalSourcing: z.boolean().optional(),
  description: z.string().optional(),
  externalLink: z.string().url().optional(),
});

const PersonalizeTeaRecommendationsInputSchema = z.object({
  userPreferences: z.string(),
  nearbyTeaShops: z.array(TeaShopSchema),
});
export type PersonalizeTeaRecommendationsInput = z.infer<typeof PersonalizeTeaRecommendationsInputSchema>;

const PersonalizeTeaRecommendationsOutputSchema = z.object({
  recommendedTeaTypes: z.array(z.string()),
  recommendedBrewingMethods: z.array(z.string()),
  recommendedLocalTeaEvents: z.array(z.string()),
  justification: z.string(),
});
export type PersonalizeTeaRecommendationsOutput = z.infer<typeof PersonalizeTeaRecommendationsOutputSchema>;

export async function personalizeTeaRecommendations(
  input: PersonalizeTeaRecommendationsInput
): Promise<PersonalizeTeaRecommendationsOutput> {
  const shopsText = input.nearbyTeaShops
    .map((shop) => {
      const lines = [
        `- Name: ${shop.name}`,
        `  Address: ${shop.address}`,
        `  Offerings: ${shop.offerings.join(', ')}`,
      ];
      if (shop.ethicalSourcing) lines.push('  Ethical Sourcing: Yes');
      if (shop.description) lines.push(`  Description: ${shop.description}`);
      if (shop.externalLink) lines.push(`  Link: ${shop.externalLink}`);
      return lines.join('\n');
    })
    .join('\n');

  const prompt = `You are QTeaCake's expert tea sommelier and guide. Your goal is to provide personalized tea recommendations based on a user's stated preferences and the offerings of nearby tea shops.

User Preferences: ${input.userPreferences}

Nearby Authentic Tea Shops:
${shopsText}

Based on the user's preferences and the available offerings from the nearby tea shops, provide specific recommendations for:
1. Unique tea types.
2. Brewing methods.
3. Any relevant local tea events or classes offered by these shops.

Ensure your recommendations are tailored and provide a clear justification for each, explaining how they align with the user's preferences and the capabilities of the nearby shops. If a shop explicitly mentions "tea classes", highlight that as a potential local tea event. If no specific events are mentioned, suggest general tea learning or tasting experiences.

Respond with a JSON object matching this exact structure:
{
  "recommendedTeaTypes": ["..."],
  "recommendedBrewingMethods": ["..."],
  "recommendedLocalTeaEvents": ["..."],
  "justification": "..."
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in Claude response');

  return PersonalizeTeaRecommendationsOutputSchema.parse(JSON.parse(jsonMatch[0]));
}
