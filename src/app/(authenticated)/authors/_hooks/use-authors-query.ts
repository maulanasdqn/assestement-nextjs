import { getAuthors } from '@/api/author';
import { TGetUsersParams } from '@/api/user';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useAuthorsQuery = (params: TGetUsersParams) => {
  return useQuery({
    queryKey: ['authors', params],
    queryFn: () => getAuthors(params),
  });
};
