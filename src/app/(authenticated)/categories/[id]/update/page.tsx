'use client';

import { FormCategory } from '../../_components/form-category';
import { Page } from 'admiral';
import { Col, Row, message } from 'antd';
import { useUpdateCategoryMutation } from './_hooks/use-update-category-mutation';
import { useParams, useRouter } from 'next/navigation';
import { useCategoryQuery } from '../_hooks/use-category-query';
import { TUpdateCategoryRequest } from '@/api/category';

const UpdateCategoryPage = () => {
  const params = useParams();
  const router = useRouter();

  const categoryId = typeof params.id === 'string' ? params.id : '';

  const categoryQuery = useCategoryQuery(categoryId);

  const updateCategoryMutation = useUpdateCategoryMutation(categoryId);

  const handleOnFinish = (data: TUpdateCategoryRequest) =>
    updateCategoryMutation.mutate(data, {
      onSuccess: () => {
        router.push('/categories');
        message.success('Category berhasil diupdate');
      },
      onError: () => {
        message.error('Category gagal diupdate');
      },
    });

  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Categories',
      path: '/categorys',
    },
    {
      label: categoryQuery.data?.data.name ?? '',
      path: `/categories/${categoryQuery.data?.data.id}`,
    },
    {
      label: 'Update',
      path: '#',
    },
  ];

  return (
    <Page title="Update Category" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormCategory
            key={categoryQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                ...categoryQuery.data?.data,
                parent_category_id:
                  categoryQuery.data?.data.parent_category?.id,
                subcategory_ids: categoryQuery?.data?.data?.subcategories?.map(
                  (subcategory) => subcategory.id
                ),
              },
              disabled: categoryQuery.isLoading,
            }}
            error={updateCategoryMutation.error}
            loading={updateCategoryMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default UpdateCategoryPage;
