import { getAuthors } from '@/api/author';
import { TGetBooksParams } from '@/api/book';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useAuthorsQuery = (params: TGetBooksParams) => {
  return useQuery({
    queryKey: ['authors', params],
    queryFn: () => getAuthors(params),
  });
};
