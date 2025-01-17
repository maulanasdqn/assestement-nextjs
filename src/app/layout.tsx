import type { Metadata } from 'next';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import { Montserrat } from 'next/font/google';
import AntDProvider from './_components/providers/theme';
import AuthProvider from './_components/providers/auth';
import QueryProvider from './_components/providers/react-query';
import './global.css';

const monserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NextJS Admiral',
  description: 'NextJS Admiral',
};

const RootLayout: FC<Readonly<PropsWithChildren>> = (props): ReactElement => {
  return (
    <html lang="en">
      <body className={monserrat.className}>
        <AuthProvider>
          <QueryProvider>
            <AntDProvider>{props.children}</AntDProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
