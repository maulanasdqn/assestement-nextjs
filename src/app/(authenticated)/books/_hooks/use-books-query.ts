import { TGetBooksParams, getBooks } from '@/api/book';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useBooksQuery = (params: TGetBooksParams) => {
  return useQuery({
    queryKey: ['books', params],
    queryFn: () => getBooks(params),
  });
};
