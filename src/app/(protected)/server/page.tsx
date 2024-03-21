import { CardContent } from '@/components/ui/Card';
import { UserInfo } from '@/components/layout/UserInfo';
import { getCurrentUser } from '@/lib/auth';

const ServerPage = async () => {
  const user = await getCurrentUser();
  return (
    <CardContent>
      <UserInfo user={user} />
    </CardContent>
  );
};

export default ServerPage;
