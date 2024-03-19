'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';

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
import { reset } from '@/actions/reset';
import { resetSchema, type ResetValues } from '@/schemas/auth';

export const ResetForm = () => {
  const [error, setError] = useState<string | null>(null),
    [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit = (values: ResetValues) => {
    setError(null);

    startTransition(async () => {
      const res = await reset(values);
      if (!res.success) return setError(res.error);
      setSuccess(res.success);
    });
  };

  return success ? (
    <CardContent>
      We&apos;ve sent a password reset link to your email, click it to reset
      your password.
    </CardContent>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className='[&>:not(:last-child)]:mb-2'>
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
          {error && (
            <Alert variant='destructive' className='mt-4'>
              <OctagonAlertIcon />
              <AlertText>{error}</AlertText>
            </Alert>
          )}
        </CardContent>
        <CardFooter className='flex-col items-start gap-4'>
          <Button type='submit' className='w-full' disabled={isPending}>
            Send reset email
          </Button>
          <FooterLink
            text='Back to sign in'
            href='/auth/sign-in'
            disabled={isPending}
          />
        </CardFooter>
      </form>
    </Form>
  );
};
