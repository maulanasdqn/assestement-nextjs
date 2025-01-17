import { TUpdateCategoryRequest, updateCategory } from '@/api/category';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useUpdateCategoryMutation = (id: string) => {
  return useMutation({
    mutationKey: ['update-category', id],
    mutationFn: (data: TUpdateCategoryRequest) => updateCategory(id, data),
  });
};
