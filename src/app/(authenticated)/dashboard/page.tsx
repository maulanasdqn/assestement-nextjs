'use client';

import { Page, Section } from 'admiral';
import { Button } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { List, Typography } from 'antd';

const { Title, Text, Link } = Typography;
const data = [
  'Buatlah 5 CRUD dalam 1 hari kerja atau 8 jam',
  <span key={1}>
    Lihatlah dokumentasi api pada{' '}
    <Link href="https://23pkaphzeu.apidog.io" target="_blank">
      https://23pkaphzeu.apidog.io
    </Link>
  </span>,
  'Implementasikan API pada aplikasi',
  'Good luck!',
];

const DashboardPage = () => {
  const session = useSession();

  return (
    <Page title="Dashboard" noStyle>
      <Section title="User" style={{ marginBottom: '1rem' }}>
        <Button type="primary" onClick={() => signOut()}>
          Sign Out
        </Button>
        <div>Name: {session?.data?.user?.email}</div>
      </Section>

      <Section title="Guide Training">
        <List
          dataSource={data}
          renderItem={(item, i) => (
            <List.Item>
              <Text mark>[{i + 1}]</Text> {item}
            </List.Item>
          )}
        />
      </Section>
    </Page>
  );
};

export default DashboardPage;
