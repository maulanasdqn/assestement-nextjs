'use client';

import { ActionTable, Page } from 'admiral';
import { Button, Modal, message } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Datatable from 'admiral/table/datatable/index';
import { ColumnsType } from 'antd/es/table';
import { useFilter } from '@/hooks/datatable/use-filter';
import Link from 'next/link';
import { TGetBorrowingResponse } from '@/api/borrowing';
import { useBorrowingsQuery } from './_hooks/use-borrowings-query';
import { makeSortOrder, makeSource } from '@/utils/data-table';
import { useDeleteBorrowingMutation } from './_hooks/use-delete-borrowing-mutation';
import RowActionButtons from 'admiral/table/row-action-button';
import { FC, ReactElement } from 'react';
import { filterSort } from '@/common/table/filters';

const BorrowingsPage: FC = (): ReactElement => {
  const { filters, pagination, handleChange, setFilters } = useFilter();

  const borrowingsQuery = useBorrowingsQuery({
    ...pagination,
    sort_by: filters?.sort?.sort_by,
    order: filters?.sort?.order?.toLowerCase(),
  });

  const deleteBorrowingMutation = useDeleteBorrowingMutation();

  const handleSubmit = (id: string) => {
    deleteBorrowingMutation.mutate(Number(id));
    message.success('Pinjaman berhasil dihapus');
  };

  const columns: ColumnsType<TGetBorrowingResponse> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'id'),
    },
    {
      dataIndex: 'user',
      key: 'user',
      title: 'User',
      sorter: false,
      render: (_, { user }) => user.name,
    },
    {
      dataIndex: 'book',
      key: 'book',
      title: 'Book',
      sorter: false,
      render: (_, { book }) => book.title,
    },
    {
      dataIndex: 'borrowed_date',
      key: 'borrowed_date',
      title: 'Borrowed Date',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'borrowed_date'),
      render: (_, { borrowed_date }) =>
        new Date(borrowed_date).toLocaleString(),
    },
    {
      dataIndex: 'return_date',
      key: 'return_date',
      title: 'Return Date',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'return_date'),
      render: (_, { return_date }) => new Date(return_date).toLocaleString(),
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'status'),
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
                title: 'Detail Borrowing',
                href: `/borrowings/${record.id}`,
              },
              {
                type: 'edit',
                title: 'Edit Borrowing',
                href: `/borrowings/${record.id}/update`,
              },
              {
                type: 'delete',
                title: 'Delete Borrowing',
                onClick: () => {
                  Modal.confirm({
                    title: 'Delete Borrowing',
                    okType: 'danger',
                    content:
                      'Data that has been deleted cannot be restored. Are you sure you want to delete this Borrowing?',
                    icon: <DeleteOutlined />,
                    onOk: () => handleSubmit(recordId!),
                    okButtonProps: {
                      loading: deleteBorrowingMutation.isPending,
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
      label: 'Borrowings',
      path: '/borrowings',
    },
  ];

  return (
    <Page
      title="Borrowings"
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
              { label: 'User', value: 'user_id' },
              { label: 'Book', value: 'book_id' },
              { label: 'Borrowed Date', value: 'borrowed_date' },
              { label: 'Return Date', value: 'return_date' },
              { label: 'Status', value: 'status' },
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
          loading={borrowingsQuery.isLoading}
          source={makeSource(borrowingsQuery.data)}
          columns={columns}
        />
      </div>
    </Page>
  );
};

export default BorrowingsPage;

const TopAction = () => (
  <Link href="/borrowings/create">
    <Button icon={<PlusCircleOutlined />}>Add borrowing</Button>
  </Link>
);
