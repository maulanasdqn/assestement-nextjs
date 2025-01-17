import { createApi, eq, filter, search, sort } from '@/utils/filter';
import publishers from '@/dummies/publishers_data.json';
import { z } from 'zod';

export const PublisherSchema = z.object({
  id: z.number(),
  name: z.string(),
  contact: z.string().email(),
  address: z.string(),
});

export type TPublisher = z.infer<typeof PublisherSchema>;

export const GET = createApi(publishers, [
  search({ fields: ['name'] }),
  sort({ fields: ['id', 'name'] }),
  filter([eq({ field: 'name' })]),
]);
