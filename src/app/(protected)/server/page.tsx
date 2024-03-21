import { UserInfo } from '@/components/layout/UserInfo';
import { getCurrentUser } from '@/lib/auth';

const ServerPage = async () => {
  const user = await getCurrentUser();
  return <UserInfo user={user} />;
};

export default ServerPage;
