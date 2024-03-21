import { ClientPageContent } from './content';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = { title: 'Client page' };

const ClientPage = () => (
  <>
    <CardHeader>
      <CardTitle>Client page</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Exporting metadata is not allowed in client components, so the
      client stuff in this page was moved to its own client component. */}
      <ClientPageContent />
    </CardContent>
  </>
);

export default ClientPage;
