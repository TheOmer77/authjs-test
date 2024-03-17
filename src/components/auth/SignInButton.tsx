'use client';

import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { Slot } from '@radix-ui/react-slot';

export type LoginButtonProps = PropsWithChildren<{
  mode?: 'modal' | 'redirect';
}>;

export const SignInButton = ({
  mode = 'redirect',
  children,
}: LoginButtonProps) => {
  const router = useRouter();

  // TODO: Implement modal & remove this error
  if (mode === 'modal')
    throw new Error('LoginButton modal not implemented yet.');

  const onClick = () => {
    router.push('/auth/sign-in');
  };

  return <Slot onClick={onClick}>{children}</Slot>;
};
