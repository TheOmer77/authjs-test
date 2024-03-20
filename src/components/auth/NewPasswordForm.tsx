'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';

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
import { newPassword } from '@/actions/newPassword';
import { newPasswordSchema, type NewPasswordValues } from '@/schemas/auth';

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | null>(null),
    [success, setSuccess] = useState(false);
  const searchParams = useSearchParams(),
    token = searchParams.get('token');
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: '' },
  });

  const handleSubmit = (values: NewPasswordValues) => {
    setError(null);

    startTransition(async () => {
      const res = await newPassword(values, token);
      if (!res.success) return setError(res.error);
      setSuccess(res.success);
    });
  };

  return success || !token ? (
    <CardContent>
      {success ? (
        <div>
          Your password has been reset! You may now use your new password to{' '}
          <Button variant='link' className='h-auto p-0 text-base' asChild>
            <Link href='/auth/sign-in'>sign in</Link>
          </Button>{' '}
          to your account.
        </div>
      ) : (
        <Alert variant='destructive'>
          <OctagonAlertIcon />
          <AlertText>Token is missing.</AlertText>
        </Alert>
      )}
    </CardContent>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className='[&>:not(:last-child)]:mb-2'>
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
            Reset password
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
