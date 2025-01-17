'use client';
'use client';

import { Button, Form, Input, Select } from 'antd';
import { FC } from 'react';
import { FormProps } from 'antd/lib';
import { createZodSync } from '@/utils/zod-sync';
import { TResponseError } from '@/common/types/response';
import { useFormErrorHandling } from '@/app/_hooks/form/use-form-error-handling';
import { AxiosError } from 'axios';
import { CreateCategoryRequestSchema } from '@/validations/categories';

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(CreateCategoryRequestSchema);

export const FormCategory: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  const parentCategories = [{ value: 1, label: 'Parent Category 1' }];
  const subcategories = [{ value: 1, label: 'Subcategory 1' }];

  useFormErrorHandling(form, error);

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item label="Name" name="name" rules={[rule]}>
        <Input placeholder="Enter category name" />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[rule]}>
        <Input.TextArea placeholder="Enter category description" rows={4} />
      </Form.Item>
      <Form.Item
        label="Parent Category"
        name="parent_category_id"
        rules={[rule]}
      >
        <Select
          placeholder="Select parent category"
          options={parentCategories}
          allowClear
        />
      </Form.Item>
      <Form.Item label="Subcategories" name="subcategory_ids" rules={[rule]}>
        <Select
          placeholder="Select subcategories"
          options={subcategories}
          mode="multiple"
          allowClear
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
