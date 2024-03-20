'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from '@/actions/signOut';

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <Card>
      <CardContent className='flex flex-col gap-4 pt-6'>
        <p>Settings page TBD. In the meantime, here&apos;s your user info:</p>
        <pre>{JSON.stringify(user, undefined, 2)}</pre>
        <Button className='self-end' onClick={() => signOut()}>
          Sign out
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
