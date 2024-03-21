'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { RoleGate } from '@/components/auth/RoleGate';
import { useToast } from '@/hooks/useToast';
import { admin } from '@/actions/admin';

const AdminPageContent = () => {
  const { displayToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const testApiRoute = () => {
    startTransition(async () => {
      const res = await (await fetch('/api/admin')).json();
      displayToast(res.success ? 'API route works!' : res.error, {
        variant: res.success ? 'default' : 'destructive',
      });
    });
  };

  const testServerAction = () => {
    startTransition(async () => {
      const res = await admin();
      displayToast(res.success ? 'Server action works!' : res.error, {
        variant: res.success ? 'default' : 'destructive',
      });
    });
  };

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
          <Button onClick={testApiRoute} disabled={isPending}>
            Test
          </Button>
        </div>
        <div className='flex flex-row items-center justify-between px-4 py-2 text-sm'>
          Admin only server action
          <Button onClick={testServerAction} disabled={isPending}>
            Test
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AdminPageContent;
