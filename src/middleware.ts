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
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(API_AUTH_PREFIX),
    isPublicRoute = publicRoutes.includes(req.nextUrl.pathname),
    isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  if (isApiAuthRoute) {
    // Reminder that Auth.js v5 is in beta, and as such can be pretty buggy!
    // https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide/issues/30#issuecomment-2002656647
    if (
      req.nextUrl.pathname.startsWith('/api/auth/auth/') &&
      req.nextUrl.searchParams.get('error')
    ) {
      const url = req.nextUrl;
      url.pathname = req.nextUrl.pathname.replace('/api/auth/', '');
      return NextResponse.redirect(url);
    }
    return;
  }
  if (isAuthRoute) {
    if (loggedIn)
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, req.nextUrl));
    return;
  }
  if (!loggedIn && !isPublicRoute)
    return Response.redirect(new URL(DEFAULT_PROTECTED_REDIRECT, req.nextUrl));
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
