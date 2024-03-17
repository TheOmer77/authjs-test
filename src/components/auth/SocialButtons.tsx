'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { Button } from '@/components/ui/Button';
import { GithubLogo, GoogleLogo } from '@/components/layout/logos';

export type SocialButtonsProps = ComponentPropsWithoutRef<'button'> & {
  onGoogleClick?: () => void;
  onGithubClick?: () => void;
};

export const SocialButtons = ({
  onGithubClick,
  onGoogleClick,
  ...props
}: SocialButtonsProps) => (
  <div>
    <div className='mb-2 text-xs text-muted-foreground'>Sign in with</div>
    <div
      className='grid grid-cols-2 gap-2 [&>button>svg]:size-4
[&>button>svg]:shrink-0 [&>button]:gap-2'
    >
      <Button
        {...props}
        type='button'
        variant='outline'
        onClick={onGoogleClick}
      >
        <GoogleLogo />
        <span>Google</span>
      </Button>
      <Button
        {...props}
        type='button'
        variant='outline'
        onClick={onGithubClick}
      >
        <GithubLogo />
        <span>GitHub</span>
      </Button>
    </div>
  </div>
);
