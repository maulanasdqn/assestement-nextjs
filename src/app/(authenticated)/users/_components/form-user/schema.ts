import dayjs from 'dayjs';
import { z } from 'zod';

export const UserFormSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  email: z.string().email(),
  password: z.string(),
  membership_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  status: z.string(),
  borrowing_ids: z.array(z.number()),
});

export type UserFormData = z.infer<typeof UserFormSchema>;
