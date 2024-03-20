'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';

import { SocialButtons } from './SocialButtons';
import { FooterLink } from './FooterLink';
import { Alert, AlertText } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { SeparatorWithText } from '@/components/ui/Separator';
import { signIn } from '@/actions/signIn';
import { signInSchema, type SignInValues } from '@/schemas/auth';

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'A user with this email already exists.'
      : '';

  const [error, setError] = useState<string | null>(null),
    [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSubmit = (values: SignInValues) => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await signIn(values);
        if (!res.success) return setError(res.error);
        if (res.twoFactor) setShowTwoFactor(true);
      } catch {
        setError('Failed to sign you in.');
      }
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>
          {showTwoFactor ? 'Quick Security Check' : 'Welcome back!'}
        </CardTitle>
        <CardDescription>
          {showTwoFactor
            ? "Enter the authentication code from your email to make sure it's you."
            : 'Enter your account details to continue.'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className='[&>:not(:last-child)]:mb-2'>
            {showTwoFactor ? (
              <FormField
                control={form.control}
                name='twoFactorCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ''}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <SocialButtons title='Sign in with' disabled={isPending} />
                <SeparatorWithText>OR</SeparatorWithText>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='password'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                      <Button variant='link' className='h-auto p-0' asChild>
                        <Link href='/auth/reset'>Forgot password?</Link>
                      </Button>
                    </FormItem>
                  )}
                />
                {(error || urlError) && (
                  <Alert variant='destructive' className='mt-4'>
                    <OctagonAlertIcon />
                    <AlertText>{error || urlError}</AlertText>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className='flex-col items-start gap-4'>
            <Button type='submit' className='w-full' disabled={isPending}>
              {showTwoFactor ? 'Confirm' : 'Sign in'}
            </Button>
            {!showTwoFactor && (
              <FooterLink
                beforeText="Don't have an account? "
                text='Sign up'
                href='/auth/sign-up'
                disabled={isPending}
              />
            )}
          </CardFooter>
        </form>
      </Form>
    </>
  );
};
