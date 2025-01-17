'use client';
'use client';

import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { Tag } from 'antd';
import { useCategoryQuery } from './_hooks/use-category-query';
import { useParams } from 'next/navigation';

const DetailCategoryPage = () => {
  const params = useParams();
  const categoryId = typeof params.id === 'string' ? params.id : '';
  const categoryQuery = useCategoryQuery(categoryId);

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Categories',
      path: '/categories',
    },
    {
      label: categoryQuery.data?.data.name ?? '',
      path: `/categories/${categoryQuery.data?.data.id}`,
    },
  ];

  return (
    <Page title="Detail Category" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={categoryQuery.isLoading} title="Detail Category">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {categoryQuery.data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Description">
            {categoryQuery.data?.data.description}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Parent Category">
            {categoryQuery.data?.data.parent_category
              ? categoryQuery.data?.data.parent_category.name
              : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Subcategories">
            {categoryQuery.data?.data.subcategories?.length
              ? categoryQuery.data?.data.subcategories.map((subcategory) => (
                  <Tag key={subcategory.id}>{subcategory.name}</Tag>
                ))
              : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailCategoryPage;
