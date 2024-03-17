import { auth } from '@/lib/auth';

const SettingsPage = async () => {
  const session = await auth();

  return <pre>{JSON.stringify(session, undefined, 2)}</pre>;
};

export default SettingsPage;
