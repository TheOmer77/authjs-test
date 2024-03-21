import type { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Navbar } from './navbar';
import { Card } from '@/components/ui/Card';
import { auth } from '@/lib/auth';

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div
        className='flex h-full flex-col items-center justify-center gap-1
p-4'
      >
        <Navbar />
        <Card className='w-full max-w-md'>{children}</Card>
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
