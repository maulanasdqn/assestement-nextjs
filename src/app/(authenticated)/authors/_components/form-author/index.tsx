'use client';

import { Button, DatePicker, Form, Input, Select } from 'antd';
import { FC } from 'react';
import { FormProps } from 'antd/lib';
import { CreateAuthorRequestSchema } from './schema';
import { useFormErrorHandling } from '@/hooks/form/use-form-error-handling';
import { createZodSync } from '@/utils/zod-sync';
import { TResponseError } from '@/common/types/response';
import { AxiosError } from 'axios';

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(CreateAuthorRequestSchema);

export const FormAuthor: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useFormErrorHandling(form, error);

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item label="Name" name="name" rules={[rule]}>
        <Input placeholder="Enter author's name" />
      </Form.Item>
      <Form.Item label="Birthdate" name="birthdate" rules={[rule]}>
        <DatePicker placeholder="Select birthdate" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Biography" name="biography" rules={[rule]}>
        <Input.TextArea placeholder="Enter biography" rows={4} />
      </Form.Item>
      <Form.Item label="Nationality" name="nationality" rules={[rule]}>
        <Select
          placeholder="Select nationality"
          options={[
            { label: 'American', value: 'American' },
            { label: 'British', value: 'British' },
            { label: 'Canadian', value: 'Canadian' },
            { label: 'Other', value: 'Other' },
          ]}
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
