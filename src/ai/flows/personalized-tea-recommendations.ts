'use server';
/**
 * @fileOverview A Genkit flow for providing personalized tea recommendations.
 *
 * - personalizeTeaRecommendations - A function that generates personalized tea recommendations.
 * - PersonalizeTeaRecommendationsInput - The input type for the personalizeTeaRecommendations function.
 * - PersonalizeTeaRecommendationsOutput - The return type for the personalizeTeaRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TeaShopSchema = z.object({
  name: z.string().describe('The name of the tea shop.'),
  address: z.string().describe('The address of the tea shop.'),
  offerings: z.array(z.string()).describe('A list of offerings by the tea shop (e.g., "loose leaf tea", "teaware", "tea classes").'),
  ethicalSourcing: z.boolean().optional().describe('Whether the tea shop emphasizes ethical sourcing or fair trade practices.'),
  description: z.string().optional().describe('A brief description of the tea shop.'),
  externalLink: z.string().url().optional().describe('An external link to the tea shop\'s website or social media.'),
});

const PersonalizeTeaRecommendationsInputSchema = z.object({
  userPreferences: z.string().describe('A detailed description of the user\'s tea preferences, including desired tea types, flavors, brewing experiences, and any other relevant tastes or interests.'),
  nearbyTeaShops: z.array(TeaShopSchema).describe('A list of nearby authentic tea shops, each with their name, address, offerings, and an optional description or ethical sourcing status.'),
});
export type PersonalizeTeaRecommendationsInput = z.infer<typeof PersonalizeTeaRecommendationsInputSchema>;

const PersonalizeTeaRecommendationsOutputSchema = z.object({
  recommendedTeaTypes: z.array(z.string()).describe('A list of recommended tea types tailored to the user\'s preferences.'),
  recommendedBrewingMethods: z.array(z.string()).describe('A list of recommended brewing methods suitable for the recommended teas and user preferences.'),
  recommendedLocalTeaEvents: z.array(z.string()).describe('A list of recommended local tea events or classes available at nearby shops, if applicable.'),
  justification: z.string().describe('An explanation of why these recommendations were made, linking them to the user\'s preferences and nearby shop offerings.'),
});
export type PersonalizeTeaRecommendationsOutput = z.infer<typeof PersonalizeTeaRecommendationsOutputSchema>;

const personalizeTeaRecommendationsPrompt = ai.definePrompt({
  name: 'personalizeTeaRecommendationsPrompt',
  input: { schema: PersonalizeTeaRecommendationsInputSchema },
  output: { schema: PersonalizeTeaRecommendationsOutputSchema },
  prompt: `You are QTeaCake's expert tea sommelier and guide. Your goal is to provide personalized tea recommendations based on a user's stated preferences and the offerings of nearby tea shops.\n\nUser Preferences: {{{userPreferences}}}\n\nNearby Authentic Tea Shops:\n{{#each nearbyTeaShops}}\n- Name: {{{name}}}\n  Address: {{{address}}}\n  Offerings: {{#each offerings}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\n  {{#if ethicalSourcing}}Ethical Sourcing: Yes{{/if}}\n  {{#if description}}Description: {{{description}}}{{/if}}\n  {{#if externalLink}}Link: {{{externalLink}}}{{/if}}\n{{/each}}\n\nBased on the user's preferences and the available offerings from the nearby tea shops, provide specific recommendations for:\n1.  Unique tea types.\n2.  Brewing methods.\n3.  Any relevant local tea events or classes offered by these shops.\n\nEnsure your recommendations are tailored and provide a clear justification for each, explaining how they align with the user's preferences and the capabilities of the nearby shops. If a shop explicitly mentions "tea classes", highlight that as a potential local tea event. If no specific events are mentioned, suggest general tea learning or tasting experiences.`,
});

const personalizeTeaRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizeTeaRecommendationsFlow',
    inputSchema: PersonalizeTeaRecommendationsInputSchema,
    outputSchema: PersonalizeTeaRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await personalizeTeaRecommendationsPrompt(input);
    return output!;
  }
);

export async function personalizeTeaRecommendations(
  input: PersonalizeTeaRecommendationsInput
): Promise<PersonalizeTeaRecommendationsOutput> {
  return personalizeTeaRecommendationsFlow(input);
}
