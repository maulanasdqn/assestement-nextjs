import { TGetBooksParams } from '@/api/book';
import { getPublishers } from '@/api/publisher';
import { useQuery } from '@/app/_hooks/request/use-query';

export const usePublishersQuery = (params: TGetBooksParams) => {
  return useQuery({
    queryKey: ['publishers', params],
    queryFn: () => getPublishers(params),
  });
};
