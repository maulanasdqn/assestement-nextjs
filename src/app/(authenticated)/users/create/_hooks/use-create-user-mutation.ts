import { createUser } from '@/api/user';
import { useMutation } from '@/hooks/request/use-mutation';

export const useCreateUserMutation = () => {
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: createUser,
  });
};
