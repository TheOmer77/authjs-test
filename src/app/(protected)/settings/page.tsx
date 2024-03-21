'use client';

import { UserInfo } from '@/components/layout/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <>
      <p>Settings page TBD. In the meantime, here&apos;s your user info:</p>
      <UserInfo user={user} />
    </>
  );
};

export default SettingsPage;
