'use client';

import type { PropsWithChildren } from 'react';
import type { UserRole } from '@prisma/client';
import { OctagonAlertIcon } from 'lucide-react';

import { Alert, AlertText } from '@/components/ui/Alert';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export type RoleGateProps = PropsWithChildren<{ allowedRole: UserRole }>;

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const user = useCurrentUser(),
    role = user?.role;

  if (role !== allowedRole)
    return (
      <Alert variant='destructive'>
        <OctagonAlertIcon />
        <AlertText>You&apos;re not allowed to view this content.</AlertText>
      </Alert>
    );
  return children;
};
