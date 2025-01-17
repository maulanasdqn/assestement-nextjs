'use client';

import { Page } from 'admiral';
import { Col, Row, message } from 'antd';
import { useRouter } from 'next/navigation';
import { FormBook } from '../_components/form-book';
import { TCreateBookRequest } from '@/api/book';
import { useCreateBookMutation } from './_hooks/use-create-book-mutation';

const CreateBookPage = () => {
  const router = useRouter();
  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Books',
      path: '/books',
    },
    {
      label: 'Create Book',
      path: '#',
    },
  ];

  const createBookMutation = useCreateBookMutation();

  const handleOnFinish = (data: TCreateBookRequest) =>
    createBookMutation.mutate(data, {
      onSuccess: () => {
        message.success('Buku berhasil dibuat');
        router.push('/books');
      },
      onError: () => {
        message.error('Buku gagal dibuat');
      },
    });

  return (
    <Page title="Add Book" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormBook
            formProps={{ onFinish: handleOnFinish }}
            error={createBookMutation.error}
            loading={createBookMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateBookPage;
