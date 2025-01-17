import { deleteBook } from '@/api/book';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useDeleteBookMutation = () => {
  return useMutation({
    mutationKey: ['delete-book'],
    mutationFn: deleteBook,
  });
};
