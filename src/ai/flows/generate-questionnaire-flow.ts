'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a questionnaire based on initial symptom analysis.
 *
 * - generateQuestionnaire - A function that takes symptom inputs and returns a list of questions tailored to the user's condition.
 * - GenerateQuestionnaireInput - The input type for the generateQuestionnaire function, including symptoms and medical history.
 * - GenerateQuestionnaireOutput - The return type for the generateQuestionnaire function, providing a list of questions.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateQuestionnaireInputSchema = z.object({
  symptoms: z.string().describe('A comma-separated list of symptoms the user is experiencing.'),
  medicalHistory: z.string().optional().describe('Relevant medical history of the user.'),
});
export type GenerateQuestionnaireInput = z.infer<typeof GenerateQuestionnaireInputSchema>;

const GenerateQuestionnaireOutputSchema = z.array(z.string())
  .describe('A list of questions tailored to the user\'s condition.');
export type GenerateQuestionnaireOutput = z.infer<typeof GenerateQuestionnaireOutputSchema>;

export async function generateQuestionnaire(input: GenerateQuestionnaireInput): Promise<GenerateQuestionnaireOutput> {
  return generateQuestionnaireFlow(input);
}

const generateQuestionnairePrompt = ai.definePrompt({
  name: 'generateQuestionnairePrompt',
  input: {
    schema: z.object({
      symptoms: z.string().describe('A comma-separated list of symptoms the user is experiencing.'),
      medicalHistory: z.string().optional().describe('Relevant medical history of the user.'),
    }),
  },
  output: {
    schema: z.array(z.string())
      .describe('A list of questions tailored to the user\'s condition.'),
  },
  prompt: `You are an AI-powered medical expert system. Given the following symptoms and medical history, generate a list of 10 specific questions that can help narrow down the potential conditions.

Symptoms: {{{symptoms}}}
Medical History: {{{medicalHistory}}}

Format the output as a JSON array of strings.
`,
});

const generateQuestionnaireFlow = ai.defineFlow<
  typeof GenerateQuestionnaireInputSchema,
  typeof GenerateQuestionnaireOutputSchema
>({
  name: 'generateQuestionnaireFlow',
  inputSchema: GenerateQuestionnaireInputSchema,
  outputSchema: GenerateQuestionnaireOutputSchema,
}, async input => {
  const {output} = await generateQuestionnairePrompt(input);
  return output!;
});
