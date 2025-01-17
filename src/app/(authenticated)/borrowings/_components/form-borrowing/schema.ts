import dayjs from 'dayjs';
import { z } from 'zod';

export const CreateBorrowingRequestSchema = z.object({
  user_id: z.number(),
  book_id: z.number(),
  borrowed_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  return_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  status: z.string(),
});
