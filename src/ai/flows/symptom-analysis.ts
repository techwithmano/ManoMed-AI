'use server';
/**
 * @fileOverview This file defines a Genkit flow for symptom analysis, providing potential medical conditions based on user-provided symptoms.
 *
 * - symptomAnalysis - A function that takes symptom inputs and returns a list of potential conditions with likelihood scores.
 * - SymptomAnalysisInput - The input type for the symptomAnalysis function, including a list of symptoms and relevant medical history.
 * - SymptomAnalysisOutput - The return type for the symptomAnalysis function, providing a ranked list of potential conditions.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z.string().describe('A comma-separated list of symptoms the user is experiencing.'),
  medicalHistory: z.string().optional().describe('Relevant medical history of the user.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const PotentialConditionSchema = z.object({
  condition: z.string().describe('The name of the potential medical condition.'),
  likelihood: z.number().describe('A score (0-1) representing the likelihood of the condition given the symptoms.'),
  description: z.string().optional().describe('A brief description of the condition.'),
});

const SymptomAnalysisOutputSchema = z.array(PotentialConditionSchema)
  .describe('A ranked list of potential conditions, ordered by likelihood (highest to lowest).');

export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function symptomAnalysis(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const symptomAnalysisPrompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {
    schema: z.object({
      symptoms: z.string().describe('A comma-separated list of symptoms the user is experiencing.'),
      medicalHistory: z.string().optional().describe('Relevant medical history of the user.'),
    }),
  },
  output: {
    schema: z.array(z.object({
      condition: z.string().describe('The name of the potential medical condition.'),
      likelihood: z.number().describe('A score (0-1) representing the likelihood of the condition given the symptoms.'),
      description: z.string().optional().describe('A brief description of the condition.'),
    })),
  },
  prompt: `You are an AI-powered medical expert system. Given the following symptoms and medical history, provide a ranked list of potential conditions, ordered by likelihood (highest to lowest). Include a likelihood score between 0 and 1.

Symptoms: {{{symptoms}}}
Medical History: {{{medicalHistory}}}

Format the output as a JSON array of objects, each with a 'condition', 'likelihood', and optional 'description' field.  The likelihood should be a number between 0 and 1.
`,
});

const symptomAnalysisFlow = ai.defineFlow<
  typeof SymptomAnalysisInputSchema,
  typeof SymptomAnalysisOutputSchema
>({
  name: 'symptomAnalysisFlow',
  inputSchema: SymptomAnalysisInputSchema,
  outputSchema: SymptomAnalysisOutputSchema,
}, async input => {
  const {output} = await symptomAnalysisPrompt(input);
  return output!;
});
