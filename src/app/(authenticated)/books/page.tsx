'use client';

import { ActionTable, Page } from 'admiral';
import { Button, Modal, message } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Datatable from 'admiral/table/datatable/index';
import { ColumnsType } from 'antd/es/table';
import { useFilter } from '@/hooks/datatable/use-filter';
import Link from 'next/link';
import { TGetBookResponse } from '@/api/book';
import { useBooksQuery } from './_hooks/use-books-query';
import { makeSortOrder, makeSource } from '@/utils/data-table';
import { useDeleteBookMutation } from './_hooks/use-delete-book-mutation';
import RowActionButtons from 'admiral/table/row-action-button';
import { FC, ReactElement } from 'react';
import { filterSort } from '@/common/table/filters';

const BooksPage: FC = (): ReactElement => {
  const { filters, pagination, handleChange, setFilters } = useFilter();

  const booksQuery = useBooksQuery({
    ...pagination,
    sort_by: filters?.sort?.sort_by,
    order: filters?.sort?.order?.toLowerCase(),
  });

  const deleteBookMutation = useDeleteBookMutation();

  const handleSubmit = (id: string) => {
    deleteBookMutation.mutate(Number(id));
    message.success('Buku berhasil dihapus');
  };

  const columns: ColumnsType<TGetBookResponse> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'id'),
    },
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Title',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'title'),
    },
    {
      dataIndex: 'authors',
      key: 'authors',
      title: 'Authors',
      sorter: false,
      render: (_, { authors }) =>
        authors.map((author) => author.name).join(', '),
    },
    {
      dataIndex: 'isbn',
      key: 'isbn',
      title: 'ISBN',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'isbn'),
    },
    {
      dataIndex: 'published_date',
      key: 'published_date',
      title: 'Published Date',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'published_date'),
      render: (_, { published_date }) =>
        new Date(published_date).toLocaleString(),
    },
    {
      dataIndex: 'quantity',
      key: 'quantity',
      title: 'Quantity',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'quantity'),
    },
    {
      dataIndex: 'categories',
      key: 'categories',
      title: 'Categories',
      sorter: false,
      render: (_, { categories }) =>
        categories.map((category) => category.name).join(', '),
    },
    {
      dataIndex: 'description',
      key: 'description',
      title: 'Description',
      sorter: false,
    },
    {
      dataIndex: 'publisher',
      key: 'publisher',
      title: 'Publisher',
      sorter: false,
      render: (publisher) => publisher.name,
    },
    {
      dataIndex: 'page_count',
      key: 'page_count',
      title: 'Page Count',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'page_count'),
    },
    {
      dataIndex: 'language',
      key: 'language',
      title: 'Language',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'language'),
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
                title: 'Detail Book',
                href: `/books/${record.id}`,
              },
              {
                type: 'edit',
                title: 'Edit Book',
                href: `/books/${record.id}/update`,
              },
              {
                type: 'delete',
                title: 'Delete Book',
                onClick: () => {
                  Modal.confirm({
                    title: 'Delete Book',
                    okType: 'danger',
                    content:
                      'Data that has been deleted cannot be restored. Are you sure you want to delete this Book?',
                    icon: <DeleteOutlined />,
                    onOk: () => handleSubmit(recordId!),
                    okButtonProps: {
                      loading: deleteBookMutation.isPending,
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
      label: 'Books',
      path: '/books',
    },
  ];

  return (
    <Page
      title="Books"
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
              { label: 'Title', value: 'title' },
              { label: 'Published Date', value: 'published_date' },
              { label: 'Authors', value: 'authors' },
              { label: 'Page Count', value: 'page_count' },
              { label: 'Quantity', value: 'quantity' },
              { label: 'Categories', value: 'categories' },
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
          loading={booksQuery.isLoading}
          source={makeSource(booksQuery.data)}
          columns={columns}
        />
      </div>
    </Page>
  );
};

export default BooksPage;

const TopAction = () => (
  <Link href="/books/create">
    <Button icon={<PlusCircleOutlined />}>Add book</Button>
  </Link>
);
