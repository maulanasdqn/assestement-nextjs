import { TUpdateBorrowingRequest, updateBorrowing } from '@/api/borrowing';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useUpdateBorrowingMutation = (id: string) => {
  return useMutation({
    mutationKey: ['update-borrowing', id],
    mutationFn: (data: TUpdateBorrowingRequest) => updateBorrowing(id, data),
  });
};
