'use client';

import { FormUser } from '../../_components/form-user';
import { Page } from 'admiral';
import { Col, Row, message } from 'antd';
import { useUpdateUserMutation } from './_hooks/use-update-user-mutation';
import { useParams, useRouter } from 'next/navigation';
import { useUserQuery } from '../_hooks/use-user-query';
import { TUpdateUserPayload } from '@/api/user';
import dayjs from 'dayjs';

const UpdateUserPage = () => {
  const params = useParams();
  const router = useRouter();

  const userId = typeof params.id === 'string' ? params.id : '';

  const userQuery = useUserQuery(userId);

  const updateUserMutation = useUpdateUserMutation(userId);

  const handleOnFinish = (data: TUpdateUserPayload) =>
    updateUserMutation.mutate(data, {
      onSuccess: () => {
        router.push('/users');
        message.success('User berhasil diupdate');
      },
      onError: () => {
        message.error('User gagal diupdate');
      },
    });

  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Users',
      path: '/users',
    },
    {
      label: userQuery.data?.data.name ?? '',
      path: `/users/${userQuery.data?.data.id}`,
    },
    {
      label: 'Update',
      path: '#',
    },
  ];

  return (
    <Page title="Update User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormUser
            key={userQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                ...userQuery.data?.data,
                membership_date: dayjs(userQuery.data?.data.membership_date),
                borrowing_ids: userQuery.data?.data.borrowings.map(
                  (borrowing) => borrowing.id
                ),
              },
              disabled: userQuery.isLoading,
            }}
            error={updateUserMutation.error}
            loading={updateUserMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default UpdateUserPage;
