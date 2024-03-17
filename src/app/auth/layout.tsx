import type { PropsWithChildren } from 'react';

import { Card } from '@/components/ui/Card';
import { AppLogo } from '@/components/layout/logos';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className='flex h-full flex-col items-center justify-center'>
    <Card className='w-full max-w-md'>
      <AppLogo className='p-6 pb-0' />
      {children}
    </Card>
  </div>
);

export default AuthLayout;
