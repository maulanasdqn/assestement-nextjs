import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';
import { z } from 'zod';
import { AuthorResponse } from '@/types/authors';
import { CreateAuthorRequestSchema } from '@/validations/authors';

export type TGetAuthorsParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TCreateAuthorRequest = z.infer<typeof CreateAuthorRequestSchema>;
export type TGetAuthorResponse = AuthorResponse;
export type TUpdateAuthorRequest = TCreateAuthorRequest & { id: string };

export const getAuthors = async (
  params: TGetAuthorsParams
): Promise<TResponsePaginate<TGetAuthorResponse>> => {
  const { data } = await axios.get<TResponsePaginate<TGetAuthorResponse>>(
    '/api/authors',
    { params }
  );
  return data;
};

export const getAuthor = async (
  id: string
): Promise<TResponseData<TGetAuthorResponse>> => {
  const { data } = await axios.get<TResponseData<TGetAuthorResponse>>(
    `/api/authors/${id}`
  );
  return data;
};

export const createAuthor = async (
  payload: TCreateAuthorRequest
): Promise<TResponseData<TGetAuthorResponse>> => {
  const { data } = await axios.post<TResponseData<TGetAuthorResponse>>(
    '/api/authors',
    payload
  );
  return data;
};

export const updateAuthor = async (
  id: string,
  payload: TUpdateAuthorRequest
): Promise<TResponseData<TGetAuthorResponse>> => {
  const { data } = await axios.put<TResponseData<TGetAuthorResponse>>(
    `/api/authors/${id}`,
    payload
  );
  return data;
};

export const deleteAuthor = async (
  id: number
): Promise<TResponseData<null>> => {
  const { data } = await axios.delete<TResponseData<null>>(
    `/api/authors/${id}`
  );
  return data;
};
