import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';
import { z } from 'zod';
import { CreateBorrowingRequestSchema } from '@/validations/borrowings';
import { BorrowingResponse } from '@/types/borrowings';

export type TGetBorrowingsParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TCreateBorrowingRequest = z.infer<
  typeof CreateBorrowingRequestSchema
>;
export type TUpdateBorrowingRequest = TCreateBorrowingRequest & { id: string };
export type TGetBorrowingResponse = BorrowingResponse;

export const getBorrowings = async (
  params?: TGetBorrowingsParams
): Promise<TResponsePaginate<TGetBorrowingResponse>> => {
  const { data } = await axios.get<TResponsePaginate<TGetBorrowingResponse>>(
    '/api/borrowings',
    { params }
  );
  return data;
};

export const getBorrowing = async (
  id: string
): Promise<TResponseData<TGetBorrowingResponse>> => {
  const { data } = await axios.get<TResponseData<TGetBorrowingResponse>>(
    `/api/borrowings/${id}`
  );
  return data;
};

export const createBorrowing = async (
  payload: TCreateBorrowingRequest
): Promise<TResponseData<TGetBorrowingResponse>> => {
  const { data } = await axios.post<TResponseData<TGetBorrowingResponse>>(
    '/api/borrowings',
    payload
  );
  return data;
};

export const updateBorrowing = async (
  id: string,
  payload: TUpdateBorrowingRequest
): Promise<TResponseData<TGetBorrowingResponse>> => {
  const { data } = await axios.put<TResponseData<TGetBorrowingResponse>>(
    `/api/borrowings/${id}`,
    payload
  );
  return data;
};

export const deleteBorrowing = async (
  id: number
): Promise<TResponseData<null>> => {
  const { data } = await axios.delete<TResponseData<null>>(
    `/api/borrowings/${id}`
  );
  return data;
};
