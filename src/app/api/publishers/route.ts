import { createApi, eq, filter, search, sort } from '@/utils/filter';
import publishers from '@/dummies/publishers_data.json';

export const GET = createApi(publishers, [
  search({ fields: ['name'] }),
  sort({ fields: ['id', 'name'] }),
  filter([eq({ field: 'name' })]),
]);
