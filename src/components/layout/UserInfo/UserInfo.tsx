import { Fragment } from 'react';
import type { User } from '@prisma/client';

type UserInfoProps = {
  user?: Partial<User>;
};

export const UserInfo = ({ user }: UserInfoProps) => (
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
);
