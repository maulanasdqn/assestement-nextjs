'use client';

import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { Tag } from 'antd';
import { useUserQuery } from './_hooks/use-user-query';
import { useParams } from 'next/navigation';

const DetailUserPage = () => {
  const params = useParams();
  const userId = typeof params.id === 'string' ? params.id : '';
  const userQuery = useUserQuery(userId);

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'User',
      path: '/users',
    },
    {
      label: userQuery.data?.data.name ?? '',
      path: `/users/${userQuery.data?.data.id}`,
    },
  ];

  return (
    <Page title="Detail User" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={userQuery.isLoading} title="Detail User">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {userQuery.data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Email">
            {userQuery.data?.data.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Membership Date">
            {userQuery.data?.data.membership_date}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Status">
            {userQuery.data?.data.status}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Borrowings">
            {userQuery.data?.data.borrowings.map((borrowing) => (
              <Tag key={borrowing.id}>{borrowing.book_title}</Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailUserPage;
