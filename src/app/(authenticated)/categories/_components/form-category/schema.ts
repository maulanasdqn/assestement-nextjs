import dayjs from 'dayjs';
import { z } from 'zod';

export const CreateBookRequestSchema = z.object({
  title: z.string(),
  author_ids: z.array(z.number()),
  isbn: z.string(),
  published_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  quantity: z.number(),
  category_ids: z.array(z.number()),
  description: z.string(),
  publisher_id: z.number(),
  page_count: z.number(),
  language: z.string(),
});
