import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { LoaderCircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const Spinner = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<typeof LoaderCircleIcon>
>(({ className, ...props }, ref) => (
  <LoaderCircleIcon
    {...props}
    ref={ref}
    className={cn('spinner animate-spin', className)}
  />
));
Spinner.displayName = 'Spinner';
