import { z } from 'zod';

export const CreateCategoryRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  parent_category_id: z.number().optional(),
  subcategory_ids: z.array(z.number()).optional(),
});

export const UpdateCategoryRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  parent_category_id: z.number().optional(),
  subcategory_ids: z.array(z.number()).optional(),
});
