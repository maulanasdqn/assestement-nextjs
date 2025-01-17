'use client';
import { FormBorrowing } from '../../_components/form-borrowing';
import { Page } from 'admiral';
import { Col, Row, message } from 'antd';
import { useUpdateBorrowingMutation } from './_hooks/use-update-borrowing-mutation';
import { useParams, useRouter } from 'next/navigation';
import { useBorrowingQuery } from '../_hooks/use-borrowing-query';
import { TUpdateBorrowingRequest } from '@/api/borrowing';
import dayjs from 'dayjs';

const UpdateBorrowingPage = () => {
  const params = useParams();
  const router = useRouter();

  const borrowingId = typeof params.id === 'string' ? params.id : '';

  const borrowingQuery = useBorrowingQuery(borrowingId);

  const updateBorrowingMutation = useUpdateBorrowingMutation(borrowingId);

  const handleOnFinish = (data: TUpdateBorrowingRequest) =>
    updateBorrowingMutation.mutate(data, {
      onSuccess: () => {
        router.push('/borrowings');
        message.success('Peminjaman berhasil diupdate');
      },
      onError: () => {
        message.error('Peminjaman gagal diupdate');
      },
    });

  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Borrowings',
      path: '/borrowings',
    },
    {
      label: borrowingQuery.data?.data.book.title ?? '',
      path: `/borrowings/${borrowingQuery.data?.data.id}`,
    },
    {
      label: 'Update',
      path: '#',
    },
  ];

  return (
    <Page title="Update Borrowing" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormBorrowing
            key={borrowingQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                ...borrowingQuery.data?.data,
                return_date: dayjs(
                  borrowingQuery.data?.data.return_date
                ).isValid()
                  ? dayjs(borrowingQuery.data?.data.return_date)
                  : null,
                borrowed_date: dayjs(
                  borrowingQuery.data?.data.borrowed_date
                ).isValid()
                  ? dayjs(borrowingQuery.data?.data.borrowed_date)
                  : null,
                user_id: borrowingQuery.data?.data.user.id,
                book_id: borrowingQuery.data?.data.book.id,
              },
              disabled: borrowingQuery.isLoading,
            }}
            error={updateBorrowingMutation.error}
            loading={updateBorrowingMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default UpdateBorrowingPage;
