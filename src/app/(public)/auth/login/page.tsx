'use client';

import { Checkbox, FormProps } from 'antd';
import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { TLoginForm } from './_entities/schema';
import { useLoginByCredentialsMutation } from './_hooks/use-login-by-credentials-mutation';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useIsMobileScreen } from '@/utils';
import { useSession } from 'next-auth/react';
import { navigateTo } from './_actions/redirect';
import { useSearchParams } from 'next/navigation';

const LoginPage: React.FC = () => {
  const session = useSession();
  const query = useSearchParams();
  const loginByCredentialMutation = useLoginByCredentialsMutation();

  const onFinish: FormProps<TLoginForm>['onFinish'] = async (values) => {
    loginByCredentialMutation.mutate(values);
  };

  const isMobile = useIsMobileScreen();

  if (session.status === 'authenticated') navigateTo(query.get('callbackUrl'));

  return (
    <Row align="middle" justify="center" style={{ height: '80%' }}>
      <Col span={24} style={{ padding: `4rem ${isMobile ? '' : '7rem'}` }}>
        <Space
          direction="vertical"
          style={{
            width: '100%',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography.Title level={4}>Welcome back!</Typography.Title>
          <Typography.Text style={{ opacity: 0.5 }}>
            Ant Design is the most influential web design specification in Xihu
            district
          </Typography.Text>
        </Space>
        <Form
          name="basic"
          style={{ paddingTop: '2.5rem' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<TLoginForm>
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item<TLoginForm>
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
            />
          </Form.Item>

          <Row
            justify="space-between"
            style={{
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          >
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Typography.Link href="">Forgot password</Typography.Link>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type={'primary'}
              loading={loginByCredentialMutation.isPending}
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Log in
            </Button>
          </Form.Item>

          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography.Text
              style={{
                display: 'inline-flex',
                gap: '14px',
              }}
            >
              Or <Typography.Link href="">Register now!</Typography.Link>
            </Typography.Text>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
