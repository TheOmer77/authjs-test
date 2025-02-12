'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';

import { SocialButtons } from './SocialButtons';
import { FooterLink } from './FooterLink';
import { Alert, AlertText } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CardContent, CardFooter } from '@/components/ui/Card';
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
import { signUp } from '@/actions/signUp';
import { signUpSchema, type SignUpValues } from '@/schemas/auth';

export const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null),
    [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '', name: '' },
  });

  const handleSubmit = (values: SignUpValues) => {
    setError(null);
    startTransition(async () => {
      const res = await signUp(values);
      if (!res.success) return setError(res.error);
      setSuccess(res.success);
    });
  };

  return success ? (
    <CardContent>
      We&apos;ve sent a confirmation link to your email, click it to verify your
      account.
    </CardContent>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className='[&>:not(:last-child)]:mb-2'>
          <SocialButtons title='Sign up with' disabled={isPending} />
          <SeparatorWithText>OR</SeparatorWithText>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input {...field} type='password' disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <Alert variant='destructive' className='mt-4'>
              <OctagonAlertIcon />
              <AlertText>{error}</AlertText>
            </Alert>
          )}
        </CardContent>
        <CardFooter className='flex-col items-start gap-4'>
          <Button type='submit' className='w-full' disabled={isPending}>
            Sign up
          </Button>
          <FooterLink
            beforeText='Already have an account? '
            text='Sign in'
            href='/auth/sign-in'
            disabled={isPending}
          />
        </CardFooter>
      </form>
    </Form>
  );
};
