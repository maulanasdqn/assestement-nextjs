import { TGetBooksParams } from '@/api/book';
import { getCategories } from '@/api/category';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useCategoriesQuery = (params: TGetBooksParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
  });
};
