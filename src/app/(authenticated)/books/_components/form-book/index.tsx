'use client';

import { Button, DatePicker, Form, Input, Select, InputNumber } from 'antd';
import { FC } from 'react';
import { FormProps } from 'antd/lib';
import { createZodSync } from '@/utils/zod-sync';
import { TResponseError } from '@/common/types/response';
import { useFormErrorHandling } from '@/app/_hooks/form/use-form-error-handling';
import { AxiosError } from 'axios';
import { CreateBookRequestSchema } from './schema';
import { useAuthorsQuery } from './use-get-authors';
import { usePublishersQuery } from './use-get-publisher';
import { useCategoriesQuery } from './use-get-categories';

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(CreateBookRequestSchema);

export const FormBook: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  const { data: authorsData } = useAuthorsQuery({});
  const { data: publishersData } = usePublishersQuery({});
  const { data: categoryData } = useCategoriesQuery({});

  const authors =
    authorsData?.data.map((author) => ({
      label: author.name,
      value: author.id,
    })) || [];

  const publishers =
    publishersData?.data.map((publisher) => ({
      label: publisher.name,
      value: publisher.id,
    })) || [];

  const categories =
    categoryData?.data?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  useFormErrorHandling(form, error);

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item label="Title" name="title" rules={[rule]}>
        <Input placeholder="Enter book title" />
      </Form.Item>
      <Form.Item label="Authors" name="author_ids" rules={[rule]}>
        <Select
          placeholder="Select authors"
          options={authors}
          mode="multiple"
        />
      </Form.Item>
      <Form.Item label="ISBN" name="isbn" rules={[rule]}>
        <Input placeholder="Enter ISBN" />
      </Form.Item>
      <Form.Item label="Published Date" name="published_date" rules={[rule]}>
        <DatePicker
          placeholder="Select published date"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Quantity" name="quantity" rules={[rule]}>
        <InputNumber
          placeholder="Enter quantity"
          style={{ width: '100%' }}
          min={1}
        />
      </Form.Item>
      <Form.Item label="Categories" name="category_ids" rules={[rule]}>
        <Select
          placeholder="Select categories"
          options={categories}
          mode="multiple"
        />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[rule]}>
        <Input.TextArea placeholder="Enter description" rows={4} />
      </Form.Item>
      <Form.Item label="Publisher" name="publisher_id" rules={[rule]}>
        <Select placeholder="Select publisher" options={publishers} />
      </Form.Item>
      <Form.Item label="Page Count" name="page_count" rules={[rule]}>
        <InputNumber
          placeholder="Enter page count"
          style={{ width: '100%' }}
          min={1}
        />
      </Form.Item>
      <Form.Item label="Language" name="language" rules={[rule]}>
        <Input placeholder="Enter language (e.g., en, fr)" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
