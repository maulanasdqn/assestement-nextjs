'use client';

import { FormAuthor } from '../../_components/form-author';
import { Page } from 'admiral';
import { Col, Row, message } from 'antd';
import { useUpdateAuthorMutation } from './_hooks/use-update-author-mutation';
import { useParams, useRouter } from 'next/navigation';
import { useAuthorQuery } from '../_hooks/use-author-query';
import { TUpdateAuthorRequest } from '@/api/author';
import dayjs from 'dayjs';

const UpdateAuthorPage = () => {
  const params = useParams();
  const router = useRouter();

  const authorId = typeof params.id === 'string' ? params.id : '';

  const authorQuery = useAuthorQuery(authorId);

  const updateAuthorMutation = useUpdateAuthorMutation(authorId);

  const handleOnFinish = (data: TUpdateAuthorRequest) =>
    updateAuthorMutation.mutate(data, {
      onSuccess: () => {
        router.push('/authors');
        message.success('Author berhasil diupdate');
      },
      onError: () => {
        message.error('Author gagal diupdate');
      },
    });

  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Authors',
      path: '/authors',
    },
    {
      label: authorQuery.data?.data.name ?? '',
      path: `/authors/${authorQuery.data?.data.id}`,
    },
    {
      label: 'Update',
      path: '#',
    },
  ];

  return (
    <Page title="Update Author" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormAuthor
            key={authorQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                ...authorQuery.data?.data,
                birthdate: dayjs(authorQuery.data?.data.birthdate),
              },
              disabled: authorQuery.isLoading,
            }}
            error={updateAuthorMutation.error}
            loading={updateAuthorMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default UpdateAuthorPage;
