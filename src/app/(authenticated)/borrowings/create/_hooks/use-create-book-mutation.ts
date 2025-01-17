import { createBorrowing } from '@/api/borrowing';
import { useMutation } from '@/hooks/request/use-mutation';

export const useCreateBorrowingMutation = () => {
  return useMutation({
    mutationKey: ['create-borrowing'],
    mutationFn: createBorrowing,
  });
};
