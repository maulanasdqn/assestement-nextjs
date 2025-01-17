'use client';

import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { useBorrowingQuery } from './_hooks/use-borrowing-query';
import { useParams } from 'next/navigation';

const DetailBorrowingPage = () => {
  const params = useParams();
  const borrowingId = typeof params.id === 'string' ? params.id : '';
  const borrowingQuery = useBorrowingQuery(borrowingId);

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Borrowings',
      path: '/borrowings',
    },
    {
      label: `Borrowing #${borrowingQuery.data?.data.id ?? ''}`,
      path: `/borrowings/${borrowingQuery.data?.data.id}`,
    },
  ];

  return (
    <Page title="Detail Borrowing" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={borrowingQuery.isLoading} title="Detail Borrowing">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="User">
            {borrowingQuery.data?.data.user.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Book">
            {borrowingQuery.data?.data.book.title}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Borrowed Date">
            {new Date(
              borrowingQuery.data?.data.borrowed_date ?? ''
            ).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Return Date">
            {new Date(
              borrowingQuery.data?.data.return_date ?? ''
            ).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Status">
            {borrowingQuery.data?.data.status}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailBorrowingPage;
