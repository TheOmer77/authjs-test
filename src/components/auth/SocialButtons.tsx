'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/Button';
import { GithubLogo, GoogleLogo } from '@/components/layout/logos';
import { DEFAULT_SIGNIN_REDIRECT } from '@/config/routes';

export type SocialButtonsProps = ComponentPropsWithoutRef<'button'> & {
  title?: string;
};

export const SocialButtons = ({ title, ...props }: SocialButtonsProps) => {
  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: DEFAULT_SIGNIN_REDIRECT });
  };

  return (
    <div>
      {title && (
        <div className='mb-2 text-xs text-muted-foreground'>{title}</div>
      )}
      <div
        className='grid grid-cols-2 gap-2 [&>button>svg]:size-4
[&>button>svg]:shrink-0 [&>button]:gap-2'
      >
        <Button
          {...props}
          type='button'
          variant='outline'
          onClick={() => handleClick('google')}
        >
          <GoogleLogo />
          <span>Google</span>
        </Button>
        <Button
          {...props}
          type='button'
          variant='outline'
          onClick={() => handleClick('github')}
        >
          <GithubLogo />
          <span>GitHub</span>
        </Button>
      </div>
    </div>
  );
};
