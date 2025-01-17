'use client';

import { ActionTable, Page } from 'admiral';
import { Button, Modal, message } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Datatable from 'admiral/table/datatable/index';
import { ColumnsType } from 'antd/es/table';
import { useFilter } from '@/hooks/datatable/use-filter';
import Link from 'next/link';
import { TGetAuthorResponse } from '@/api/author';
import { useAuthorsQuery } from './_hooks/use-authors-query';
import { makeSortOrder, makeSource } from '@/utils/data-table';
import { useDeleteAuthorMutation } from './_hooks/use-delete-author-mutation';
import RowActionButtons from 'admiral/table/row-action-button';
import { FC, ReactElement } from 'react';
import { filterSort } from '@/common/table/filters';

const AuthorsPage: FC = (): ReactElement => {
  const { filters, pagination, handleChange, setFilters } = useFilter();

  const authorsQuery = useAuthorsQuery({
    ...pagination,
    sort_by: filters?.sort?.sort_by,
    order: filters?.sort?.order?.toLowerCase(),
  });

  const deleteAuthorMutation = useDeleteAuthorMutation();

  const handleSubmit = (id: string) => {
    deleteAuthorMutation.mutate(Number(id));
    message.success('Penulis berhasil dihapus');
  };

  const columns: ColumnsType<TGetAuthorResponse> = [
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
      dataIndex: 'birthdate',
      key: 'birthdate',
      title: 'Birthdate',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'birthdate'),
      render: (_, { birthdate }) => new Date(birthdate).toLocaleString(),
    },
    {
      dataIndex: 'biography',
      key: 'biography',
      title: 'Biography',
      sorter: false,
    },
    {
      dataIndex: 'nationality',
      key: 'nationality',
      title: 'Nationality',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'nationality'),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (_, record) => {
        const recordId = record?.id?.toString();
        return (
          <RowActionButtons
            actions={[
              {
                type: 'view',
                title: 'Detail Author',
                href: `/authors/${record.id}`,
              },
              {
                type: 'edit',
                title: 'Edit Author',
                href: `/authors/${record.id}/update`,
              },
              {
                type: 'delete',
                title: 'Delete Author',
                onClick: () => {
                  Modal.confirm({
                    title: 'Delete Author',
                    okType: 'danger',
                    content:
                      'Data that has been deleted cannot be restored. Are you sure you want to delete this Author?',
                    icon: <DeleteOutlined />,
                    onOk: () => handleSubmit(recordId!),
                    okButtonProps: {
                      loading: deleteAuthorMutation.isPending,
                    },
                  });
                },
              },
            ]}
          />
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
      label: 'Authors',
      path: '/authors',
    },
  ];

  return (
    <Page
      title="Authors"
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
              { label: 'Birthdate', value: 'birthdate' },
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
          search={filters.search}
          onChange={handleChange}
          rowKey="id"
          showRowSelection={false}
          loading={authorsQuery.isLoading}
          source={makeSource(authorsQuery.data)}
          columns={columns}
        />
      </div>
    </Page>
  );
};

export default AuthorsPage;

const TopAction = () => (
  <Link href="/authors/create">
    <Button icon={<PlusCircleOutlined />}>Add author</Button>
  </Link>
);
