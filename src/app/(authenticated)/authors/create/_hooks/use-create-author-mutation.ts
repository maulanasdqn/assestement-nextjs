import { createAuthor } from '@/api/author';
import { useMutation } from '@/hooks/request/use-mutation';

export const useCreateAuthorMutation = () => {
  return useMutation({
    mutationKey: ['create-author'],
    mutationFn: createAuthor,
  });
};
