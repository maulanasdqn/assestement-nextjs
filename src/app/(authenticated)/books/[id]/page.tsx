'use client';

import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { Tag } from 'antd';
import { useBookQuery } from './_hooks/use-book-query';
import { useParams } from 'next/navigation';

const DetailBookPage = () => {
  const params = useParams();
  const bookId = typeof params.id === 'string' ? params.id : '';
  const bookQuery = useBookQuery(bookId);

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Books',
      path: '/books',
    },
    {
      label: bookQuery.data?.data.title ?? '',
      path: `/books/${bookQuery.data?.data.id}`,
    },
  ];

  return (
    <Page title="Detail Book" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={bookQuery.isLoading} title="Detail Book">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Title">
            {bookQuery.data?.data.title}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Authors">
            {bookQuery.data?.data.authors.map((author) => (
              <Tag key={author.id}>{author.name}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="ISBN">
            {bookQuery.data?.data.isbn}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Published Date">
            {new Date(
              String(bookQuery.data?.data.published_date)
            ).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Quantity">
            {bookQuery.data?.data.quantity}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Categories">
            {bookQuery.data?.data.categories.map((category) => (
              <Tag key={category.id}>{category.name}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Description">
            {bookQuery.data?.data.description}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Publisher">
            {bookQuery.data?.data.publisher.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Page Count">
            {bookQuery.data?.data.page_count}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Language">
            {bookQuery.data?.data.language}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailBookPage;
