import { deleteAuthor } from '@/api/author';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useDeleteAuthorMutation = () => {
  return useMutation({
    mutationKey: ['delete-author'],
    mutationFn: deleteAuthor,
  });
};
