import Link from 'next/link';

import { Button, type ButtonProps } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type FooterLinkProps = {
  text: string;
  href: string;
  beforeText?: string;
} & Omit<ButtonProps, 'children'>;

export const FooterLink = ({
  text,
  href,
  beforeText,
  className,
  ...props
}: FooterLinkProps) => (
  <div className='text-sm text-muted-foreground'>
    {beforeText}
    <Button
      {...props}
      variant='link'
      className={cn('h-auto p-0', className)}
      asChild
    >
      <Link href={href}>{text}</Link>
    </Button>
  </div>
);
