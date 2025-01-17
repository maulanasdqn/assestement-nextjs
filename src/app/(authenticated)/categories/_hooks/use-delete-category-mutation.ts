import { deleteCategory } from '@/api/category';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationKey: ['delete-category'],
    mutationFn: deleteCategory,
  });
};
