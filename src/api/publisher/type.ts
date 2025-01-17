import { z } from 'zod';

export const PublisherSchema = z.object({
  id: z.number(),
  name: z.string(),
  contact: z.string().email(),
  address: z.string(),
});

export type TPublisher = z.infer<typeof PublisherSchema>;
