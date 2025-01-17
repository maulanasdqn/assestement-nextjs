import { TResponseError } from '@/common/types/response';
import { formErrorHandling } from '@/utils/form';
import { FormInstance } from 'antd';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const useFormErrorHandling = <Values = any>(
  form: FormInstance<Values>,
  error?: AxiosError<TResponseError> | null
) => {
  useEffect(() => {
    if (error?.response?.data) formErrorHandling(form, error.response.data);
  }, [error, form]);
};
