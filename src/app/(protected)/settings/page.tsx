import SettingsForm from './form';
import { CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = { title: 'Settings' };

const SettingsPage = () => (
  <>
    <CardHeader>
      <CardTitle>Settings</CardTitle>
    </CardHeader>
    <SettingsForm />
  </>
);

export default SettingsPage;
