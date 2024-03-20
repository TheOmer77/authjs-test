import type { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/lib/auth';

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className='flex h-full items-center justify-center'>{children}</div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
