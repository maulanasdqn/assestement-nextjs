import { TFilter } from '@/app/_hooks/datatable/use-filter';
import { searchDropdownOptions } from '@/utils';
import { SortAscendingOutlined } from '@ant-design/icons';
import { TFilterItem } from 'admiral/table/filter-collection/factory';
import { type SelectProps } from 'antd';
import { SortValue } from '../constants';

export const filterSort = ({
  options,
  searchParams,
}: {
  options: SelectProps['options'];
  searchParams?: Record<string, TFilter>;
}): TFilterItem => {
  return {
    name: 'sort',
    label: 'Sort',
    title: 'Sort',
    type: 'Group',
    icon: <SortAscendingOutlined />,
    cols: 2,
    filters: [
      {
        label: 'Field',
        name: 'sort_by',
        placeholder: 'Select Field',
        type: 'Select',
        value: searchParams?.sort_by,
        showSearch: true,
        filterOption: (input, option) =>
          searchDropdownOptions(
            input,
            option as { label: string; value: string }
          ),
        options,
      },
      {
        label: <div style={{ visibility: 'hidden' }}>Order</div>,
        name: 'order',
        type: 'Select',
        placeholder: 'Select Order',
        showSearch: true,
        filterOption: (input, option) =>
          searchDropdownOptions(
            input,
            option as { label: string; value: string }
          ),
        value: searchParams?.order,
        options: SortValue,
      },
    ],
    maxWidth: 600,
  };
};
