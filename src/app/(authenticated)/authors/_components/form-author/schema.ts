import dayjs from 'dayjs';
import { z } from 'zod';

export const CreateAuthorRequestSchema = z.object({
  name: z.string(),
  birthdate: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  biography: z.string(),
  nationality: z.string(),
});

export type AuthorFormData = z.infer<typeof CreateAuthorRequestSchema>;
