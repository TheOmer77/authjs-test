'use client';

import { CardContent } from '@/components/ui/Card';
import { UserInfo } from '@/components/layout/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <CardContent>
      <UserInfo user={user} />
    </CardContent>
  );
};

export default ClientPage;
