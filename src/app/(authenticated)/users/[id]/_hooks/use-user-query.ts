import { getUser } from '@/api/user';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useUserQuery = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
};
