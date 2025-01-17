'use client';

import { Page } from 'admiral';
import { Col, Row, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useCreateBorrowingMutation } from './_hooks/use-create-book-mutation';
import { TCreateBorrowingRequest } from '@/api/borrowing';
import { FormBorrowing } from '../_components/form-borrowing';

const CreateBorrowingPage = () => {
  const router = useRouter();
  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'borrowings',
      path: '/borrowings',
    },
    {
      label: 'Create Borrowing',
      path: '#',
    },
  ];

  const createBorrowingMutation = useCreateBorrowingMutation();

  const handleOnFinish = (data: TCreateBorrowingRequest) =>
    createBorrowingMutation.mutate(data, {
      onSuccess: () => {
        message.success('Peminjaman berhasil dibuat');
        router.push('/borrowings');
      },
      onError: () => {
        message.error('Peminjaman gagal dibuat');
      },
    });

  return (
    <Page title="Add Borrowing" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormBorrowing
            formProps={{ onFinish: handleOnFinish }}
            error={createBorrowingMutation.error}
            loading={createBorrowingMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateBorrowingPage;
