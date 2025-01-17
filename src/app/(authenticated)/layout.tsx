'use client';

import { FC, PropsWithChildren } from 'react';
import { MainLayout } from '@/components/ui/layout';

const AuthenticatedTemplate: FC<Readonly<PropsWithChildren>> = (props) => {
  return <MainLayout>{props.children}</MainLayout>;
};

export default AuthenticatedTemplate;
