import { TUpdateBookRequest, updateBook } from '@/api/book';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useUpdateBookMutation = (id: string) => {
  return useMutation({
    mutationKey: ['update-book', id],
    mutationFn: (data: TUpdateBookRequest) => updateBook(id, data),
  });
};
