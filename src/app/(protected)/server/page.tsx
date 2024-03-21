import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserInfo } from '@/components/layout/UserInfo';
import { getCurrentUser } from '@/lib/auth';

const ServerPage = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <CardHeader>
        <CardTitle>Server component</CardTitle>
      </CardHeader>
      <CardContent>
        <UserInfo user={user} />
      </CardContent>
    </>
  );
};

export default ServerPage;
