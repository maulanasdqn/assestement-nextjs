import { TUpdateUserPayload, updateUser } from '@/api/user';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useUpdateUserMutation = (id: string) => {
  return useMutation({
    mutationKey: ['update-user', id],
    mutationFn: (data: TUpdateUserPayload) => updateUser(id, data),
  });
};
