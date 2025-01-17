import { TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';

export type TGetBorrowingsParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TGetBorrowingsResponse = {
  id: number;
  user_id: number;
  book_id: number;
  borrowed_date: string;
  return_date: string;
  status: string;
  user: {
    id: number;
    name: string;
  };
  book: {
    id: number;
    title: string;
  };
};

export const getBorrowings = async (params?: TGetBorrowingsParams) => {
  const { data } = await axios.get<TResponsePaginate<TGetBorrowingsResponse>>(
    '/api/borrowings',
    { params }
  );
  return data;
};
