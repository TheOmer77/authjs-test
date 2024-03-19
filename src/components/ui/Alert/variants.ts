import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  `relative flex w-full flex-row items-start gap-2 rounded-lg border px-4 py-3
text-sm [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: `border-destructive/15 text-destructive bg-destructive/10
[&>svg]:text-destructive`,
      },
    },
    defaultVariants: { variant: 'default' },
  }
);
