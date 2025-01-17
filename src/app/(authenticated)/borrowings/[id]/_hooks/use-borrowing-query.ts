import { getBorrowing } from '@/api/borrowing';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useBorrowingQuery = (id: string) => {
  return useQuery({
    queryKey: ['borrowing', id],
    queryFn: () => getBorrowing(id),
  });
};
