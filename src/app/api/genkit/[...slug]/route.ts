
import {createApiHandler} from '@genkit-ai/next';
import {ai} from '@/ai/genkit';

// This imports your flows for their side effects.
import '@/ai/flows';

export const {GET, POST} = createApiHandler(ai);
