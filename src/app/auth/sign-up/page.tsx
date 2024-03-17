import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { SignUpForm } from '@/components/auth/SignUpForm';

const SignInPage = () => (
  <>
    <CardHeader>
      <CardTitle>Let&apos;s get started</CardTitle>
      <CardDescription>
        Fill in your details below to create your account.
      </CardDescription>
    </CardHeader>
    <SignUpForm />
  </>
);

export default SignInPage;
