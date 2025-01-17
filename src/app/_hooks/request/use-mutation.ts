import { TResponseError } from '@/common/types/response';
import {
  QueryClient,
  UseMutationOptions,
  useMutation as useMutationOrigin,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useMutation = <
  TData = unknown,
  TError = AxiosError<TResponseError>,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
  queryClient?: QueryClient
) =>
  useMutationOrigin<TData, TError, TVariables, TContext>(options, queryClient);
