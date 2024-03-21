import AdminPageContent from './content';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = { title: 'Admin page' };

const ServerPage = async () => (
  <>
    <CardHeader>
      <CardTitle>Admin page</CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      <AdminPageContent />
    </CardContent>
  </>
);

export default ServerPage;
