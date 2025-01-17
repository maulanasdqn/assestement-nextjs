import { TGetBorrowingsParams, getBorrowings } from '@/api/borrowings';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useBorrowingOptionQuery = (params?: TGetBorrowingsParams) => {
  return useQuery({
    queryKey: ['borrowing-option', params],
    queryFn: () => getBorrowings(params),
    select: (data) =>
      data.data.map((item) => ({ value: item.id, label: item.book.title })),
  });
};
