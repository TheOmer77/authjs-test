import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { signOut } from '@/actions/signOut';
import { auth } from '@/lib/auth';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className='flex h-full items-center justify-center'>
      <Card>
        <CardContent className='flex flex-col gap-4 pt-6'>
          <p>
            Settings page TBD. In the meantime, here&apos;s your session info:
          </p>
          <pre>{JSON.stringify(session, undefined, 2)}</pre>
          <form action={signOut} className='self-end'>
            <Button type='submit'>Sign out</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
