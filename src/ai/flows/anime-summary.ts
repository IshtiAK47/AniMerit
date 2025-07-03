// src/ai/flows/anime-summary.ts
'use server';
/**
 * @fileOverview A flow to generate summaries for trending anime.
 *
 * - generateAnimeSummary - A function that generates a summary for an anime.
 * - AnimeSummaryInput - The input type for the generateAnimeSummary function.
 * - AnimeSummaryOutput - The return type for the generateAnimeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimeSummaryInputSchema = z.object({
  title: z.string().describe('The title of the anime.'),
  description: z.string().describe('The description of the anime.'),
});
export type AnimeSummaryInput = z.infer<typeof AnimeSummaryInputSchema>;

const AnimeSummaryOutputSchema = z.object({
  summary: z.string().describe('A short summary of the anime.'),
});
export type AnimeSummaryOutput = z.infer<typeof AnimeSummaryOutputSchema>;

export async function generateAnimeSummary(input: AnimeSummaryInput): Promise<AnimeSummaryOutput> {
  return generateAnimeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'animeSummaryPrompt',
  input: {schema: AnimeSummaryInputSchema},
  output: {schema: AnimeSummaryOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing anime series and movies.

  Please provide a concise and engaging summary for the following anime, using the available description:

  Title: {{{title}}}
  Description: {{{description}}}
  `,
});

const generateAnimeSummaryFlow = ai.defineFlow(
  {
    name: 'generateAnimeSummaryFlow',
    inputSchema: AnimeSummaryInputSchema,
    outputSchema: AnimeSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
