import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { LockIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const AppLogo = forwardRef<
  ElementRef<'h1'>,
  ComponentPropsWithoutRef<'h1'>
>(({ className, ...props }, ref) => (
  <h1
    {...props}
    ref={ref}
    className={cn(
      `flex select-none flex-row items-center text-2xl font-extrabold
tracking-tight text-primary`,
      className
    )}
  >
    <LockIcon className='size-[3.25em]' strokeWidth={1.5} />
    <div className='flex flex-col items-start leading-none'>
      <span>The</span>
      <span>Auth</span>
      <span>Thing</span>
    </div>
  </h1>
));
AppLogo.displayName = 'Logo';
