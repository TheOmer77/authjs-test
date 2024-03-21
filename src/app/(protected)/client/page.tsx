'use client';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserInfo } from '@/components/layout/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <>
      <CardHeader>
        <CardTitle>Client component</CardTitle>
      </CardHeader>
      <CardContent>
        <UserInfo user={user} />
      </CardContent>
    </>
  );
};

export default ClientPage;
