import { createCategory } from '@/api/category';
import { useMutation } from '@/hooks/request/use-mutation';

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationKey: ['create-category'],
    mutationFn: createCategory,
  });
};
