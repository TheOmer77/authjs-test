import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { SignInForm } from '@/components/auth/SignInForm';
import { AppLogo } from '@/components/layout/logos';

const SignInPage = () => (
  <Card className='w-full max-w-md'>
    <CardHeader>
      <AppLogo className='mb-4' />
      <CardTitle>Welcome back!</CardTitle>
      <CardDescription>Enter your account details to continue.</CardDescription>
    </CardHeader>
    <SignInForm />
  </Card>
);

export default SignInPage;
