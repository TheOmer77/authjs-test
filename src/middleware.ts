import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';

import authConfig from '@/config/auth';
import {
  API_AUTH_PREFIX,
  DEFAULT_SIGNIN_REDIRECT,
  DEFAULT_PROTECTED_REDIRECT,
  authRoutes,
  publicRoutes,
} from '@/config/routes';

const { auth } = NextAuth(authConfig);
export default auth(req => {
  const loggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX),
    isPublicRoute = publicRoutes.includes(nextUrl.pathname),
    isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // Reminder that Auth.js v5 is in beta, and as such can be pretty buggy!
    // https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide/issues/30#issuecomment-2002656647
    if (
      nextUrl.pathname.startsWith('/api/auth/auth/') &&
      nextUrl.searchParams.get('error')
    ) {
      const url = nextUrl;
      url.pathname = nextUrl.pathname.replace('/api/auth/', '');
      return NextResponse.redirect(url);
    }
    return;
  }
  if (isAuthRoute) {
    if (loggedIn)
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    return;
  }
  if (!loggedIn && !isPublicRoute) {
    const callbackUrl = `${nextUrl.pathname}${nextUrl.search || ''}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(
        `${DEFAULT_PROTECTED_REDIRECT}?callbackUrl=${encodedCallbackUrl}`,
        nextUrl
      )
    );
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
