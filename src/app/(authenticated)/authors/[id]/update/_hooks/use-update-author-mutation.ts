import { TUpdateAuthorRequest, updateAuthor } from '@/api/author';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useUpdateAuthorMutation = (id: string) => {
  return useMutation({
    mutationKey: ['update-author', id],
    mutationFn: (data: TUpdateAuthorRequest) => updateAuthor(id, data),
  });
};
