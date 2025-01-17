import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';

export type TGetUsersParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TGetUsersResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  membership_date: string;
  status: string;
  borrowings: {
    id: number;
    book_title: string;
  }[];
};
export const getUsers = async (
  params: TGetUsersParams
): Promise<TResponsePaginate<TGetUsersResponse>> => {
  const { data } = await axios.get<TResponsePaginate<TGetUsersResponse>>(
    '/api/users',
    { params }
  );
  return data;
};

export type TGetUserResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  membership_date: string;
  status: string;
  borrowings: {
    id: number;
    book_title: string;
  }[];
};
export const getUser = async (
  id: string
): Promise<TResponseData<TGetUserResponse>> => {
  const { data } = await axios.get<TResponseData<TGetUserResponse>>(
    `/api/users/${id}`
  );
  return data;
};

export type TCreateUserPayload = {
  name: string;
  email: string;
  password: string;
  membership_date: string;
  status: string;
  borrowing_ids: number[];
};
export type TCreateUserResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  membership_date: string;
  status: string;
  borrowings: {
    id: number;
    book_title: string;
  }[];
};

export const createUser = async (
  payload: TCreateUserPayload
): Promise<TResponseData<TCreateUserResponse>> => {
  const { data } = await axios.post<TResponseData<TCreateUserResponse>>(
    '/api/users',
    payload
  );
  return data;
};

export type TUpdateUserPayload = {
  fullname: string;
  password: string;
  email: string;
  address: string;
  roleId: number;
};

export type TUpdateUserResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  membership_date: string;
  status: string;
  borrowings: {
    id: number;
    book_title: string;
  }[];
};
export const updateUser = async (
  id: string,
  payload: TUpdateUserPayload
): Promise<TResponseData<TUpdateUserResponse>> => {
  const { data } = await axios.put<TResponseData<TUpdateUserResponse>>(
    `/api/users/${id}`,
    payload
  );
  return data;
};

export type TDeleteUserResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  membership_date: string;
  status: string;
  borrowings: {
    id: number;
    book_title: string;
  }[];
};
export const deleteUser = async (
  id: number
): Promise<TResponseData<TDeleteUserResponse>> => {
  const { data } = await axios.delete<TResponseData<TDeleteUserResponse>>(
    `/api/users/${id}`
  );
  return data;
};
