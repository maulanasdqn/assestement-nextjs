import {
  DashboardOutlined,
  KeyOutlined,
  UserOutlined,
  EyeOutlined,
  TableOutlined,
  BookOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

export const navbarMenu = [
  {
    key: '/dashboard',
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <DashboardOutlined />,
    permissions: [],
  },
  {
    key: '/users',
    label: <Link href="/users">Users</Link>,
    icon: <UserOutlined />,
    permissions: [],
  },
];
