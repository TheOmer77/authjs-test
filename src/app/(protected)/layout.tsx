import type { PropsWithChildren } from 'react';

import { Navbar } from './navbar';
import { Card } from '@/components/ui/Card';

const ProtectedLayout = ({ children }: PropsWithChildren) => (
  <div
    className='flex h-full flex-col items-center justify-center gap-1
p-4'
  >
    <Navbar />
    <Card className='w-full max-w-md'>{children}</Card>
  </div>
);

export default ProtectedLayout;
