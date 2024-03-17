import type { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className='flex h-full flex-col items-center justify-center'>
    {children}
  </div>
);

export default AuthLayout;
