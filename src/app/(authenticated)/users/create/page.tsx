'use client';

import { FormUser } from '../_components/form-user';
import { UserFormData } from '../_components/form-user/schema';
import { Page } from 'admiral';
import { Col, Row, message } from 'antd';
import { useCreateUserMutation } from './_hooks/use-create-user-mutation';
import { useRouter } from 'next/navigation';

const CreateUserPage = () => {
  const router = useRouter();
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
      label: 'Create User',
      path: '#',
    },
  ];

  const createUserMutation = useCreateUserMutation();

  const handleOnFinish = (data: UserFormData) =>
    createUserMutation.mutate(
      { ...data, membership_date: data.membership_date.format('YYYY-MM-DD') },
      {
        onSuccess: () => {
          message.success('User berhasil dibuat');
          router.push('/users');
        },
        onError: () => {
          message.error('User gagal dibuat');
        },
      }
    );

  return (
    <Page title="Add User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormUser
            formProps={{ onFinish: handleOnFinish }}
            error={createUserMutation.error}
            loading={createUserMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateUserPage;
