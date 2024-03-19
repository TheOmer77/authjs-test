import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ResetForm } from '@/components/auth/ResetForm';

const ResetPage = () => (
  <>
    <CardHeader>
      <CardTitle>Forgot your password?</CardTitle>
      <CardDescription>
        No worries - just enter your email and we&apos;ll help you reset it.
      </CardDescription>
    </CardHeader>
    <ResetForm />
  </>
);

export default ResetPage;
