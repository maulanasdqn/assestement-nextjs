import { useRouter, useSearchParams } from 'next/navigation';
import { DataTablePagination } from 'admiral/table/datatable/type';
import { isObject } from '@/utils/type';
import dayjs from 'dayjs';
import { useTableFilter } from 'admiral';
import {
  UseTableFilterProps,
  UseTableFilterReturn,
} from 'admiral/table/datatable/hook';

/**
 * Custom hook to manage and synchronize filter state with URL query parameters.
 *
 * @param {UseTableFilterProps['options']} [options] - Optional configuration for the table filter.
 * @returns {Object} An object containing:
 * - `searchParams`: The current URL search parameters.
 * - `cb`: A callback function to update the URL with the new query parameters.
 * - `options`: Optional configuration for the table filter.
 *
 * @example
 * const { searchParams, cb, options } = useFilter();
 *
 * console.log(searchParams);
 * // Output:
 * // URLSearchParams { 'page' => '1', 'limit' => '10', 'sort' => 'name', 'order' => 'asc', 'search' => 'example' }
 *
 * // Implementation on Datatable component
 * <DataTable
 *  onChange={cb}
 *  search={searchParams.get('search')}
 * ...
 * />
 *
 * // Update filter manually
 * cb(new URLSearchParams({ name: "new value" }));
 * // Output:
 * // URL updated with new query parameters
 */

export const useFilter = (options?: UseTableFilterProps['options']) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return useTableFilter({
    searchParams: new URLSearchParams(searchParams.toString()),
    cb: (params) => {
      const queryParams = params.toString();

      router.replace(queryParams ? `?${queryParams}` : '', {
        scroll: false,
      });
    },
    options,
  });
};

export type TFilter = string | undefined;

/**
 * Converts an iterable of key-value pairs into an object.
 *
 * @param entries - An iterable iterator of key-value pairs where both key and value are strings.
 * @returns An object where each key-value pair from the iterable is assigned to the object.
 *
 * @example
 * const entries = new Map([["key1", "value1"], ["key2", "value2"]]).entries();
 * const result = paramsToObject(entries);
 * console.log(result); // { key1: "value1", key2: "value2" }
 */
function paramsToObject(entries: IterableIterator<[string, string]>) {
  const result: Record<string, TFilter> = {};
  // Forced assign type because weird error typescript
  for (let entry of entries as unknown as Array<[string, string]>) {
    const [key, value] = entry;
    result[key] = value;
  }
  return result;
}

/**
 * Normalizes pagination data by converting the keys to a consistent format.
 *
 * @param data - The pagination data to normalize.
 * @returns An object containing the normalized pagination data or undefined if no data is provided.
 *
 * @example
 * ```typescript
 * const paginationData = {
 *   page: 1,
 *   per_page: 10,
 *   total: 100,
 * };
 *
 * const normalizedData = normalizePagination(paginationData);
 * // normalizedData will be:
 * // {
 * //   page: 1,
 * //   perPage: 10,
 * //   total: 100,
 * // }
 * ```
 */
const normalizePagination = (data?: DataTablePagination) => {
  if (!data) return;
  return {
    page: data.page,
    perPage: data.per_page,
    total: data.total,
  };
};

/**
 * Normalizes the given data by flattening nested objects and converting values to appropriate string representations.
 *
 * @param data - Record with string keys and values of any type.
 * @returns A new record with string keys and values of type TFilter.
 *
 * @example
 * ```typescript
 * const data = {
 *   date: dayjs('2023-10-01'),
 *   range: [dayjs('2023-10-01'), dayjs('2023-10-10')],
 *   array: [1, 2, 3],
 *   nested: { key: 'value' },
 *   nullValue: null,
 *   undefinedValue: undefined,
 *   stringValue: 'example'
 * };
 *
 * const normalizedData = normalize(data);
 * console.log(normalizedData);
 * // Output:
 * // {
 * //   date: '2023-10-01T00:00:00.000Z',
 * //   range: '2023-10-01;2023-10-10',
 * //   array: '1,2,3',
 * //   key: 'value',
 * //   nullValue: undefined,
 * //   undefinedValue: undefined,
 * //   stringValue: 'example'
 * // }
 * ```
 */
const normalize = (data: Record<string, unknown>): Record<string, TFilter> => {
  // Flatting data
  const cloneData: Record<string, TFilter> = Object.keys(data).reduce(
    (all, key) => {
      // check if the value is object then flatting it
      const dataKey = data[key];

      if (dayjs.isDayjs(dataKey)) {
        // convert dayjs to iso string (output: 2023-10-01T00:00:00.000Z)
        all[key] = dataKey.toISOString();
      } else if (
        // convert date range to string (output: 2023-10-01;2023-10-10)
        Array.isArray(dataKey) &&
        dayjs.isDayjs(dataKey[0]) &&
        dayjs.isDayjs(dataKey[1]) &&
        dataKey.length === 2
      ) {
        const startDate = dataKey[0].format('YYYY-MM-DD');
        const endDate = dataKey[1].format('YYYY-MM-DD');
        all[key] = `${startDate};${endDate}`;
      } else if (Array.isArray(dataKey)) {
        // convert array to comma separated string (output: 1,2,3)
        all[key] = dataKey.join(',');
      } else if (dataKey === undefined || dataKey === null) {
        // convert null or undefined to undefined (output: undefined)
        all[key] = undefined;
      } else if (isObject(dataKey)) {
        // recursive flatting object
        const normalizedData = normalize(dataKey);
        Object.keys(normalizedData).forEach((valueKey) => {
          if (!all[valueKey]) all[valueKey] = normalizedData[valueKey];
        });
      } else {
        // other type convert to string
        all[key] = String(dataKey);
      }

      return all;
    },
    {} as Record<string, TFilter>
  );
  return cloneData;
};

// TODO: rename to useDatatableParams
export const usePaginateFilter = () => {
  const searchParams = useSearchParams();

  return {
    page: Number(searchParams.get('page') || 1),
    perPage: Number(searchParams.get('perPage') || 10),
    search: String(searchParams.get('search') || ''),
    status: String(searchParams.get('status') || ''),
    department: String(searchParams.get('department') || ''),
    searchDepartment: String(searchParams.get('searchDepartment') || ''),
  };
};
