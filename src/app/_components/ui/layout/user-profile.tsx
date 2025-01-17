'use client';

import {
  DownOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Flex, Modal, Space, Typography } from 'antd';
import { signOut, useSession } from 'next-auth/react';

const UserProfile = () => {
  const { data } = useSession();
  const { Text } = Typography;

  return (
    <Flex
      justify="space-between"
      align="center"
      onClick={(e) => e.preventDefault()}
      style={{ padding: '8px 16px', width: '100%', cursor: 'pointer' }}
    >
      <Flex gap={12} align="center">
        <Avatar size="default" data-testid="avatar">
          {data?.user?.email}
        </Avatar>

        <Space.Compact direction="vertical" size="small">
          {/* Username */}
          <Text
            style={{
              fontWeight: '700',
              fontSize: '14px',
              color: 'black',
            }}
          >
            {data?.user?.email}
          </Text>

          {/* User Roles */}
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'rgba(0, 0, 0, 0.3)',
            }}
          >
            -
          </Text>
        </Space.Compact>
      </Flex>
    </Flex>
  );
};

export default UserProfile;
