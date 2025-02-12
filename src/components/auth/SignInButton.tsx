'use client';

import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Slot } from '@radix-ui/react-slot';

import { SignInForm } from './SignInForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';

export type LoginButtonProps = PropsWithChildren<{
  mode?: 'modal' | 'redirect';
}>;

export const SignInButton = ({
  mode = 'redirect',
  children,
}: LoginButtonProps) => {
  const router = useRouter();
  const session = useSession();

  if (mode === 'modal' && session.status !== 'authenticated')
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className='w-full max-w-md p-0'>
          <SignInForm />
        </DialogContent>
      </Dialog>
    );

  const onClick = () => {
    router.push('/auth/sign-in');
  };

  return <Slot onClick={onClick}>{children}</Slot>;
};
