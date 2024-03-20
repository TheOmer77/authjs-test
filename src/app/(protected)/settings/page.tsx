'use client';

import { Fragment } from 'react';

import { useCurrentUser } from '@/hooks/useCurrentUser';

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <>
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
    </>
  );
};

export default SettingsPage;
