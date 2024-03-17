import { auth } from '@/lib/auth';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className='flex h-full flex-col items-center justify-center gap-4'>
      <p>Settings page TBD. In the meantime, here&apos;s your session info:</p>
      <pre>{JSON.stringify(session, undefined, 2)}</pre>
    </div>
  );
};

export default SettingsPage;
