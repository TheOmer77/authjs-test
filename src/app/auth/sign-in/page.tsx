import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { SignInForm } from '@/components/auth/SignInForm';
import { Logo } from '@/components/layout/Logo';

const SignInPage = () => (
  <Card className='w-full max-w-md'>
    <CardHeader>
      <Logo className='mb-4' />
      <CardTitle>Welcome back!</CardTitle>
      <CardDescription>Enter your account details to continue.</CardDescription>
    </CardHeader>
    <SignInForm />
  </Card>
);

export default SignInPage;
