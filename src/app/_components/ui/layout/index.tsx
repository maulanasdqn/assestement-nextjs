'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { MainLayout as Layout } from 'admiral';
import { TBreadcrumbsItem } from 'admiral/breadcrumb';
import Image from 'next/image';
import { Flex, Grid, Typography } from 'antd';
import UserProfile from './user-profile';
import { navbarMenu } from './menu';

export type TMainLayoutProps = {
  title?: string;
  children: React.ReactNode;
  breadcrumbs?: TBreadcrumbsItem[];
  topActions?: React.ReactNode;
};

export const MainLayout: React.FC<TMainLayoutProps> = ({ children }) => {
  const router = usePathname();

  const filteredNavbarMenu = useMemo(() => {
    return navbarMenu;
  }, []);

  const activeMenuKey = useMemo(() => {
    const pathParts = router.split('/');
    if (pathParts.length < 3) {
      return router;
    }

    const [, topLevel, subLevel] = pathParts;
    const activeMenuKey = `/${topLevel}/${subLevel}`;
    return activeMenuKey;
  }, [router]);

  const defaultOpenedKey = useMemo(() => {
    if (!filteredNavbarMenu) return undefined;
    let commonPart = activeMenuKey.split('/');

    filteredNavbarMenu.forEach((item) => {
      if (item && 'key' in item && typeof item.key === 'string' && item.key) {
        const parts = (item.key as string).split('/');
        let i = 0;
        while (
          i < commonPart.length &&
          i < parts.length &&
          commonPart[i] === parts[i]
        ) {
          i++;
        }
        commonPart = commonPart.slice(i);
      }
    });
    return commonPart || undefined;
  }, [activeMenuKey, filteredNavbarMenu]);

  const { md } = Grid.useBreakpoint();

  return (
    <Layout
      header={{
        brandLogo: (
          <Flex align="center" gap={8}>
            <Image src="/logo.svg" width={30} height={30} priority alt="" />
            <Typography.Title
              level={4}
              style={{
                marginBottom: 0,
                color: md ? 'white' : 'black',
                whiteSpace: 'nowrap',
              }}
            >
              Ant Design
            </Typography.Title>
          </Flex>
        ),
      }}
      sidebar={{
        width: 250,
        defaultSelectedKeys: [activeMenuKey],
        defaultOpenKeys: [`/${defaultOpenedKey && defaultOpenedKey[0]}`],
        menu: filteredNavbarMenu,
        theme: 'light',
        extra: <UserProfile />,
      }}
    >
      {children}
    </Layout>
  );
};
