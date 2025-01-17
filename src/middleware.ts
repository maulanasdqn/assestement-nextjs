import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === '/') {
      // Redirect to '/dashboard'
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return;
  },
  {
    // Callback for checking authorization token
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  // https://next-auth.js.org/configuration/nextjs#middleware
  matcher: ['/', '/dashboard', '/users/:path*'],
};
