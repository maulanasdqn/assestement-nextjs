'use client';

import { Page } from 'admiral';
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
import { useFilter, usePaginateFilter } from '@/hooks/datatable/use-filter';
import Link from 'next/link';
import { TGetUsersResponse } from '@/api/user';
import { useDeleteUserMutation } from './_hooks/use-delete-user-mutation';
import { useUsersQuery } from './_hooks/use-users-query';
import { makeSortOrder, makeSource } from '@/utils/data-table';

// User Index Page
const UsersPage = () => {
  const router = useRouter();
  const { filters, pagination, handleChange } = useFilter();

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
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={usersQuery.isLoading}
        source={makeSource(usersQuery.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};

export default UsersPage;

const TopAction = () => (
  <Link href="/users/create">
    <Button icon={<PlusCircleOutlined />}>Add User</Button>
  </Link>
);
