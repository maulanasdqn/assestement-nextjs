import { getCategory } from '@/api/category';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useCategoryQuery = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategory(id),
  });
};
