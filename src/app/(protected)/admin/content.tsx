'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { RoleGate } from '@/components/auth/RoleGate';

const AdminPageContent = () => {
  return (
    <>
      <RoleGate allowedRole='ADMIN'>
        <div className='mb-8 text-center text-8xl font-extrabold tracking-tighter text-primary'>
          I AM ADMIN.
        </div>
      </RoleGate>
      <Card>
        <div className='flex flex-row items-center justify-between px-4 py-2 text-sm'>
          Admin only API route
          <Button>Test</Button>
        </div>
        <div className='flex flex-row items-center justify-between px-4 py-2 text-sm'>
          Admin only server action
          <Button>Test</Button>
        </div>
      </Card>
    </>
  );
};

export default AdminPageContent;
