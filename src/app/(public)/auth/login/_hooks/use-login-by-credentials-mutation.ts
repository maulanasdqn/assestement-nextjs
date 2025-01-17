import { loginByCredentials } from '../_actions/login-action';
import { message } from 'antd';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useLoginByCredentialsMutation = () => {
  return useMutation({
    mutationKey: ['login-by-credentials'],
    mutationFn: loginByCredentials,
    onSuccess: () => {
      message.success('Login berhasil');
    },
    onError: (error: Error) => {
      message.error(error.message.split('.')[0]);
    },
  });
};
