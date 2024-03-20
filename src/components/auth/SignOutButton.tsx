'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Button } from '@/components/ui/Button';
import { signOut } from '@/actions/signOut';

export const SignOutButton = forwardRef<
  ElementRef<typeof Button>,
  ComponentPropsWithoutRef<typeof Button>
>(({ children, ...props }, ref) => (
  <Button {...props} ref={ref} onClick={() => signOut()}>
    {children}
  </Button>
));
SignOutButton.displayName = 'SignOutButton';
