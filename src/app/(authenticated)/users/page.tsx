'use client';

import { ActionTable, Page } from 'admiral';
import { Button, Flex, message } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Datatable from 'admiral/table/datatable/index';
import { ColumnsType } from 'antd/es/table';
import { useFilter } from '@/hooks/datatable/use-filter';
import Link from 'next/link';
import { TGetUsersResponse } from '@/api/user';
import { useDeleteUserMutation } from './_hooks/use-delete-user-mutation';
import { useUsersQuery } from './_hooks/use-users-query';
import { makeSortOrder, makeSource } from '@/utils/data-table';
import { filterSort } from '@/common/table/filters';

const UsersPage = () => {
  const router = useRouter();
  const { filters, pagination, handleChange, setFilters } = useFilter();

  const usersQuery = useUsersQuery({
    ...pagination,
    sort_by: filters.sort_by,
    order: filters.order?.toLowerCase(),
  });

  const deleteUserMutation = useDeleteUserMutation();

  const columns: ColumnsType<TGetUsersResponse> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'id'),
    },
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Name',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'name'),
    },
    {
      dataIndex: 'email',
      title: 'Email',
      key: 'email',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'email'),
    },
    {
      dataIndex: 'membership_date',
      title: 'Membership Date',
      key: 'membership_date',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'membership_date'),
      render: (data) => {
        return new Date(data).toLocaleString();
      },
    },
    {
      dataIndex: 'Action',
      title: 'Action',
      key: 'Action',
      render: (_, record) => {
        return (
          <Flex>
            <Link href={`/users/${record.id}`}>
              <Button
                type="link"
                icon={<EyeOutlined style={{ color: 'green' }} />}
              />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => {
                deleteUserMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success('User berhasil dihapus');
                    router.refresh();
                  },
                });
              }}
            />
            <Link href={`/users/${record.id}/update`}>
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Users',
      path: '/users',
    },
  ];

  return (
    <Page
      title="Users"
      breadcrumbs={breadcrumbs}
      topActions={<TopAction />}
      noStyle
    >
      <ActionTable
        onSearch={(value) => setFilters({ search: value })}
        searchValue={filters.search}
        onFiltersChange={(values) =>
          setFilters(values as Record<string, string>)
        }
        filters={[
          filterSort({
            options: [
              { label: 'ID', value: 'id' },
              { label: 'Name', value: 'name' },
              { label: 'Email', value: 'email' },
            ],
            searchParams: filters,
          }),
        ]}
      />
      <div
        style={{
          backgroundColor: 'white',
          padding: '5px',
          marginTop: '10px',
        }}
      >
        <Datatable
          hideSearch
          onChange={handleChange}
          rowKey="id"
          showRowSelection={false}
          loading={usersQuery.isLoading}
          source={makeSource(usersQuery.data)}
          columns={columns}
          search={filters.search}
        />
      </div>
    </Page>
  );
};

export default UsersPage;

const TopAction = () => (
  <Link href="/users/create">
    <Button icon={<PlusCircleOutlined />}>Add User</Button>
  </Link>
);
