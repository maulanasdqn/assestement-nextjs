'use client';

import { Page } from 'admiral';
import { Col, Row, message } from 'antd';
import { useRouter } from 'next/navigation';
import { FormCategory } from '../_components/form-category';
import { TCreateCategoryRequest } from '@/api/category';
import { useCreateCategoryMutation } from './_hooks/use-create-category-mutation';

const CreateCategoryPage = () => {
  const router = useRouter();
  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Categories',
      path: '/categories',
    },
    {
      label: 'Create Category',
      path: '#',
    },
  ];

  const createCategoryMutation = useCreateCategoryMutation();

  const handleOnFinish = (data: TCreateCategoryRequest) =>
    createCategoryMutation.mutate(data, {
      onSuccess: () => {
        message.success('Category berhasil dibuat');
        router.push('/categories');
      },
      onError: () => {
        message.error('Buku gagal dibuat');
      },
    });

  return (
    <Page title="Add Category" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormCategory
            formProps={{ onFinish: handleOnFinish }}
            error={createCategoryMutation.error}
            loading={createCategoryMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateCategoryPage;
