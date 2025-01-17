import { TGetCategoriesParams, getCategories } from '@/api/category';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useCategoriesQuery = (params: TGetCategoriesParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
  });
};
