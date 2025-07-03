'use server';

import { generateAnimeSummary } from '@/ai/flows/anime-summary';
import { z } from 'zod';

const summarySchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
});

export async function getAiSummary(formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
  };

  const validation = summarySchema.safeParse(rawData);

  if (!validation.success) {
    return { error: 'Invalid input.' };
  }
  
  // The synopsis from the API can be very long. Let's truncate it.
  const description = validation.data.description.length > 2000 
    ? `${validation.data.description.substring(0, 2000)}...`
    : validation.data.description;


  try {
    const result = await generateAnimeSummary({ title: validation.data.title, description });
    return { summary: result.summary };
  } catch (error) {
    console.error('AI summary generation failed:', error);
    return { error: 'Failed to generate summary. Please try again later.' };
  }
}
