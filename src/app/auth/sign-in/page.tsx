import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { SignInForm } from '@/components/auth/SignInForm';

const SignInPage = () => (
  <>
    <CardHeader>
      <CardTitle>Welcome back!</CardTitle>
      <CardDescription>Enter your account details to continue.</CardDescription>
    </CardHeader>
    <SignInForm />
  </>
);

export default SignInPage;
