import type { TResponsePaginate } from '@/common/types/response';
import { IDataTableProps } from 'admiral/table/datatable/type';
import { SortOrder } from 'antd/es/table/interface';

export const makeSource = <T extends Record<string, any>>(
  source?: TResponsePaginate<T>
): IDataTableProps<T, {}>['source'] | undefined => {
  if (!source) return;
  return {
    data: source.data,
    meta: {
      page: source.meta.page,
      pageSize: source.meta.per_page,
      total: source.meta.total,
    },
  };
};

export const makeSortOrder = (
  filters: Record<string, any>,
  sortBy: string
): SortOrder => {
  if (filters.sort_by === sortBy && filters.order === 'ASC') {
    return 'ascend';
  } else if (filters.sort_by === sortBy && filters.order === 'DESC') {
    return 'descend';
  }
  return null;
};
