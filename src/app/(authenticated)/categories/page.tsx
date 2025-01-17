'use client';

import { ActionTable, Page } from 'admiral';
import { Button, Modal, message } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Datatable from 'admiral/table/datatable/index';
import { ColumnsType } from 'antd/es/table';
import { useFilter } from '@/hooks/datatable/use-filter';
import Link from 'next/link';
import { TGetCategoryResponse } from '@/api/category';
import { useCategoriesQuery } from './_hooks/use-categories-query';
import { makeSortOrder, makeSource } from '@/utils/data-table';
import { useDeleteCategoryMutation } from './_hooks/use-delete-category-mutation';
import RowActionButtons from 'admiral/table/row-action-button';
import { FC, ReactElement } from 'react';
import { filterSort } from '@/common/table/filters';

const CategoriesPage: FC = (): ReactElement => {
  const { filters, pagination, handleChange, setFilters } = useFilter();

  const categoriesQuery = useCategoriesQuery({
    ...pagination,
    sort_by: filters?.sort?.sort_by,
    order: filters?.sort?.order?.toLowerCase(),
  });

  const deleteCategoryMutation = useDeleteCategoryMutation();

  const handleSubmit = (id: string) => {
    deleteCategoryMutation.mutate(Number(id));
    message.success('Category berhasil dihapus');
  };

  const columns: ColumnsType<TGetCategoryResponse> = [
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
      dataIndex: 'description',
      key: 'description',
      title: 'Description',
      sorter: false,
    },
    {
      dataIndex: 'parent_category',
      key: 'parent_category',
      title: 'Parent Category',
      sorter: false,
      render: (parent_category) => parent_category?.name ?? 'N/A',
    },
    {
      dataIndex: 'subcategories',
      key: 'subcategories',
      title: 'Subcategories',
      sorter: false,
      render: (_, { subcategories }) =>
        subcategories?.map((subcategory) => subcategory.name).join(', ') ??
        'N/A',
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
                title: 'Detail Category',
                href: `/categories/${record.id}`,
              },
              {
                type: 'edit',
                title: 'Edit Category',
                href: `/categories/${record.id}/update`,
              },
              {
                type: 'delete',
                title: 'Delete Category',
                onClick: () => {
                  Modal.confirm({
                    title: 'Delete Category',
                    okType: 'danger',
                    content:
                      'Data that has been deleted cannot be restored. Are you sure you want to delete this Category?',
                    icon: <DeleteOutlined />,
                    onOk: () => handleSubmit(recordId!),
                    okButtonProps: {
                      loading: deleteCategoryMutation.isPending,
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
      label: 'Categories',
      path: '/categories',
    },
  ];

  return (
    <Page
      title="Categories"
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
              { label: 'Description', value: 'description' },
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
          loading={categoriesQuery.isLoading}
          source={makeSource(categoriesQuery.data)}
          columns={columns}
        />
      </div>
    </Page>
  );
};

export default CategoriesPage;

const TopAction = () => (
  <Link href="/categories/create">
    <Button icon={<PlusCircleOutlined />}>Add category</Button>
  </Link>
);
