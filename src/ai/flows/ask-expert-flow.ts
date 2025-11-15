'use server';
/**
 * @fileOverview An AI expert flow for answering questions about celestial bodies.
 * 
 * - askExpert - A function that handles answering questions about a planet.
 * - AskExpertInput - The input type for the askExpert function.
 * - AskExpertOutput - The return type for the askExpert function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AskExpertInputSchema = z.object({
  planetName: z.string().describe('The name of the planet.'),
  planetDescription: z.string().describe('A brief description of the planet.'),
  question: z.string().describe('The user\'s question about the planet.'),
});
export type AskExpertInput = z.infer<typeof AskExpertInputSchema>;
export type AskExpertOutput = string;


const prompt = ai.definePrompt({
    name: 'askExpertPrompt',
    input: { schema: AskExpertInputSchema },
    prompt: `You are an expert astronomer and astrophysicist integrated into a 3D solar system viewer application called AuraX. Your name is Celeste.

A user has selected a planet and is asking a question about it. Provide a concise, accurate, and engaging answer suitable for a general audience.

- **Your Persona:** Knowledgeable, friendly, and enthusiastic about space.
- **Context:** The user is looking at a 3D model of the solar system.
- **Answer Style:** Keep it to 2-4 clear and easy-to-understand paragraphs. Start your answer by directly addressing the question.

**Planet Information:**
- Name: {{{planetName}}}
- Description: {{{planetDescription}}}

**User's Question:**
"{{{question}}}"

Provide your expert answer below:
`,
});

const askExpertFlow = ai.defineFlow(
    {
        name: 'askExpertFlow',
        inputSchema: AskExpertInputSchema,
        outputSchema: z.string(),
    },
    async (input) => {
        const {text} = await prompt(input);
        return text;
    }
);

export async function askExpert(input: AskExpertInput): Promise<AskExpertOutput> {
  return askExpertFlow(input);
}
