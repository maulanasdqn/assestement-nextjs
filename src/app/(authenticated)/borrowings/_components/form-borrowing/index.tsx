'use client';

import { Button, DatePicker, Form, Select } from 'antd';
import { FC } from 'react';
import { FormProps } from 'antd/lib';
import { createZodSync } from '@/utils/zod-sync';
import { TResponseError } from '@/common/types/response';
import { useFormErrorHandling } from '@/app/_hooks/form/use-form-error-handling';
import { AxiosError } from 'axios';
import { useUsersQuery } from '@/app/(authenticated)/users/_hooks/use-users-query';
import { useBooksQuery } from '@/app/(authenticated)/books/_hooks/use-books-query';
import { CreateBorrowingRequestSchema } from './schema';

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(CreateBorrowingRequestSchema);

export const FormBorrowing: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  const { data: usersData } = useUsersQuery({});
  const { data: booksData } = useBooksQuery({});

  const users =
    usersData?.data.map((user) => ({
      label: user.name,
      value: user.id,
    })) || [];

  const books =
    booksData?.data.map((book) => ({
      label: book.title,
      value: book.id,
    })) || [];

  useFormErrorHandling(form, error);

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item label="User" name="user_id" rules={[rule]}>
        <Select placeholder="Select user" options={users} />
      </Form.Item>
      <Form.Item label="Book" name="book_id" rules={[rule]}>
        <Select placeholder="Select book" options={books} />
      </Form.Item>
      <Form.Item label="Borrowed Date" name="borrowed_date" rules={[rule]}>
        <DatePicker
          placeholder="Select borrowed date"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Return Date" name="return_date" rules={[rule]}>
        <DatePicker
          placeholder="Select return date"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[rule]}>
        <Select
          placeholder="Select status"
          options={[
            { label: 'Pending', value: 'Pending' },
            { label: 'Approved', value: 'Approved' },
            { label: 'Returned', value: 'Returned' },
            { label: 'Cancelled', value: 'Cancelled' },
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
