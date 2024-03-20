'use client';

import { LogOutIcon, UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from '@/actions/signOut';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' className='rounded-full'>
          <Avatar>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className='bg-transparent'>
              <UserIcon className='fill-current stroke-none' />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className='mr-2 h-4 w-4' />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
