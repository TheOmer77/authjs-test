'use client';

import { UserInfo } from '@/components/layout/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const ClientPageContent = () => {
  const user = useCurrentUser();
  return <UserInfo user={user} />;
};
