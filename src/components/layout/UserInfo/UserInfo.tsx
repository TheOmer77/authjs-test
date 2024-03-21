import { Fragment } from 'react';
import type { User } from '@prisma/client';

const displayedProperties = {
  id: 'ID',
  name: 'Name',
  email: 'Email',
  role: 'Role',
  image: 'Image',
  twofactor_enabled: '2FA enabled',
} as const satisfies Partial<Record<keyof User, string>>;

type UserInfoProps = {
  user?: Partial<User>;
};

export const UserInfo = ({ user }: UserInfoProps) => (
  <div className='grid grid-cols-[auto,1fr] gap-x-4 gap-y-2'>
    {user
      ? Object.entries(displayedProperties).map(([key, displayName]) => {
          const value = user[key as keyof User];

          let displayValue: string;
          switch (true) {
            case value instanceof Date:
              displayValue = value.toISOString();
              break;
            case typeof value === 'boolean':
              displayValue = `${value.toString()[0].toUpperCase()}${value.toString().slice(1)}`;
              break;
            case value === null || typeof value === 'undefined':
              displayValue = 'None';
              break;
            default:
              displayValue = value;
              break;
          }

          return (
            <Fragment key={key}>
              <span className='text-sm font-medium'>{`${displayName}:`}</span>
              <span className='truncate text-sm text-muted-foreground'>
                {displayValue}
              </span>
            </Fragment>
          );
        })
      : 'No user! 😱'}
  </div>
);
