'use client';

import { Button } from '@/components/ui/Button';
import { GithubLogo, GoogleLogo } from '@/components/layout/logos';

export type SocialButtonsProps = {
  onGoogleClick?: () => void;
  onGithubClick?: () => void;
};

export const SocialButtons = ({
  onGithubClick,
  onGoogleClick,
}: SocialButtonsProps) => (
  <div
    className='grid grid-cols-2 gap-2 [&>button>svg]:size-[1.5em]
[&>button>svg]:shrink-0'
  >
    <Button variant='outline' onClick={onGoogleClick}>
      <GoogleLogo />
    </Button>
    <Button variant='outline' onClick={onGithubClick}>
      <GithubLogo />
    </Button>
  </div>
);
