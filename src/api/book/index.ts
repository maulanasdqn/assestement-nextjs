import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';
import { z } from 'zod';
import { CreateBookRequestSchema } from '@/validations/books';
import { BookResponse } from '@/types/books';

export type TGetBooksParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TCreateBookRequest = z.infer<typeof CreateBookRequestSchema>;
export type TUpdateBookRequest = TCreateBookRequest & { id: string };
export type TGetBookResponse = BookResponse;

export const getBooks = async (
  params: TGetBooksParams
): Promise<TResponsePaginate<TGetBookResponse>> => {
  const { data } = await axios.get<TResponsePaginate<TGetBookResponse>>(
    '/api/books',
    { params }
  );
  return data;
};

export const getBook = async (
  id: string
): Promise<TResponseData<TGetBookResponse>> => {
  const { data } = await axios.get<TResponseData<TGetBookResponse>>(
    `/api/books/${id}`
  );
  return data;
};

export const createBook = async (
  payload: TCreateBookRequest
): Promise<TResponseData<TGetBookResponse>> => {
  const { data } = await axios.post<TResponseData<TGetBookResponse>>(
    '/api/books',
    payload
  );
  return data;
};

export const updateBook = async (
  id: string,
  payload: TUpdateBookRequest
): Promise<TResponseData<TGetBookResponse>> => {
  const { data } = await axios.put<TResponseData<TGetBookResponse>>(
    `/api/books/${id}`,
    payload
  );
  return data;
};

export const deleteBook = async (id: number): Promise<TResponseData<null>> => {
  const { data } = await axios.delete<TResponseData<null>>(`/api/books/${id}`);
  return data;
};
