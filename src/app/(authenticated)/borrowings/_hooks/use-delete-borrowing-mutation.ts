import { deleteBorrowing } from '@/api/borrowing';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useDeleteBorrowingMutation = () => {
  return useMutation({
    mutationKey: ['delete-borrowing'],
    mutationFn: deleteBorrowing,
  });
};
