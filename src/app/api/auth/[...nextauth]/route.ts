import { envServer } from '@/configs/env-server.config';
import * as Sentry from '@sentry/nextjs';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { schema } from '@/app/(public)/auth/login/_entities/schema';
import { signIn } from '@/api/auth/sign-in';

const handler = NextAuth({
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google({
      clientId: envServer.NEXTAUTH_GOOGLE_ID ?? '',
      clientSecret: envServer.NEXTAUTH_GOOGLE_SECRET ?? '',
    }),
    CredentialsProvider({
      id: 'login',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Masukkan email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*********',
        },
      },
      async authorize(credentials) {
        const userData = schema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!userData.success) {
          throw new Error(userData.error.issues[0].message);
        }

        if (!userData.data?.email || !userData.data?.password) {
          throw new Error('Email dan Password wajib diisi');
        }

        try {
          const { data } = await signIn({
            email: userData.data.email,
            password: userData.data.password,
          });
          return {
            id: userData.data.email,
            email: userData.data.email,
            token: data.data.token,
          };
        } catch (error: any) {
          Sentry.captureException(error);
          throw new Error(
            error?.response?.data?.error_message || "Something wen't wrong"
          );
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
