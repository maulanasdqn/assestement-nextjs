import { createBook } from '@/api/book';
import { useMutation } from '@/hooks/request/use-mutation';

export const useCreateBookMutation = () => {
  return useMutation({
    mutationKey: ['create-book'],
    mutationFn: createBook,
  });
};
