import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import {
  Item,
  SelectItemIndicator,
  SelectItemText,
} from '@radix-ui/react-select';

import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

export const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      `relative flex w-full cursor-default select-none items-center rounded-sm
py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent
focus:text-accent-foreground data-[disabled]:pointer-events-none
data-[disabled]:opacity-50`,
      className
    )}
    {...props}
  >
    <span
      className='absolute right-2 flex h-3.5 w-3.5 items-center
justify-center'
    >
      <SelectItemIndicator>
        <CheckIcon className='h-4 w-4' />
      </SelectItemIndicator>
    </span>
    <SelectItemText>{children}</SelectItemText>
  </Item>
));
SelectItem.displayName = Item.displayName;
