import { TResponseData } from '@/common/types/response';
import { axios } from '@/utils/fetcher';
import Email from 'next-auth/providers/email';

export type TSignInPayload = {
  email: string;
  password: string;
};

export type TSignInResponse = {
  expired_at: string;
  token: string;
};

export const signIn = (payload: TSignInPayload) => {
  return {
    data: {
      data: {
        email: payload.email,
        token: payload.password,
      },
    },
  };
  return axios.post<TResponseData<TSignInResponse>>(
    '/api/v1/auth/sign-in',
    payload
  );
};
