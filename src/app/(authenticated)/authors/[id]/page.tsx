'use client';

import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { useAuthorQuery } from './_hooks/use-author-query';
import { useParams } from 'next/navigation';

const DetailAuthorPage = () => {
  const params = useParams();
  const authorId = typeof params.id === 'string' ? params.id : '';
  const authorQuery = useAuthorQuery(authorId);

  const breadcrumbs = [
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
  ];

  return (
    <Page title="Detail Author" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={authorQuery.isLoading} title="Detail Author">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {authorQuery.data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Birthdate">
            {new Date(
              authorQuery.data?.data.birthdate ?? ''
            ).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Biography">
            {authorQuery.data?.data.biography}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Nationality">
            {authorQuery.data?.data.nationality}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailAuthorPage;
