import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';
import { z } from 'zod';
import { CreateCategoryRequestSchema } from '@/validations/categories';
import { CategoryResponse } from '@/types/categories';

export type TGetCategoriesParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TCreateCategoryRequest = z.infer<
  typeof CreateCategoryRequestSchema
>;
export type TGetCategoryResponse = CategoryResponse;
export type TUpdateCategoryRequest = TCreateCategoryRequest & { id: string };

export const getCategories = async (
  params: TGetCategoriesParams
): Promise<TResponsePaginate<TGetCategoryResponse>> => {
  const { data } = await axios.get<TResponsePaginate<TGetCategoryResponse>>(
    '/api/categories',
    { params }
  );
  return data;
};

export const getCategory = async (
  id: string
): Promise<TResponseData<TGetCategoryResponse>> => {
  const { data } = await axios.get<TResponseData<TGetCategoryResponse>>(
    `/api/categories/${id}`
  );
  return data;
};

export const createCategory = async (
  payload: TCreateCategoryRequest
): Promise<TResponseData<TGetCategoryResponse>> => {
  const { data } = await axios.post<TResponseData<TGetCategoryResponse>>(
    '/api/categories',
    payload
  );
  return data;
};

export const updateCategory = async (
  id: string,
  payload: TUpdateCategoryRequest
): Promise<TResponseData<TGetCategoryResponse>> => {
  const { data } = await axios.put<TResponseData<TGetCategoryResponse>>(
    `/api/categories/${id}`,
    payload
  );
  return data;
};

export const deleteCategory = async (
  id: number
): Promise<TResponseData<null>> => {
  const { data } = await axios.delete<TResponseData<null>>(
    `/api/categories/${id}`
  );
  return data;
};
