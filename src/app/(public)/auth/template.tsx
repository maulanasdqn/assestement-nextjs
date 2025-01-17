'use client';

import { useIsMobileScreen } from '@/utils';
import { Col, Layout, Row } from 'antd';
import Image from 'next/image';
import { FC, PropsWithChildren, ReactElement, Suspense } from 'react';

const { Content } = Layout;

const AuthTemplate: FC<Readonly<PropsWithChildren>> = (props): ReactElement => {
  const isMobile = useIsMobileScreen();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          display: 'flex',
        }}
      >
        <Row style={{ width: '100%' }}>
          <Col span={isMobile ? 24 : 10}>
            <Image
              src="/img/logo-dot.svg"
              style={{ margin: '1.5rem' }}
              width={80}
              height={80}
              alt="logo"
            />

            <Suspense>{props.children}</Suspense>
          </Col>

          <Col span={isMobile ? 0 : 14}>
            <Image
              src={'/img/ilustration-login.png'}
              alt="ilustration login"
              layout="fill"
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthTemplate;
