'use client';

import { Fragment } from 'react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from '@/actions/signOut';

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <Card>
      <CardContent className='flex flex-col gap-4 pt-6'>
        <p>Settings page TBD. In the meantime, here&apos;s your user info:</p>
        <div className='grid grid-cols-[auto,1fr] gap-x-4 gap-y-2'>
          {user
            ? Object.entries(user).map(([key, value]) => (
                <Fragment key={key}>
                  <span className='text-sm font-medium'>
                    {`${key[0].toUpperCase()}${key.slice(1)}:`}
                  </span>
                  <span className='text-sm text-muted-foreground'>{`${value}`}</span>
                </Fragment>
              ))
            : 'No user! 😱'}
        </div>
        <Button className='self-end' onClick={() => signOut()}>
          Sign out
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
