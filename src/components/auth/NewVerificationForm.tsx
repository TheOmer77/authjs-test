'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { OctagonAlertIcon } from 'lucide-react';

import { Alert, AlertText } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { newVerification } from '@/actions/newVerfication';
import { cn } from '@/lib/utils';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | null>(null),
    [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (success || error) return;
    if (!token) return setError('Token is missing.');

    const verify = async () => {
      try {
        const res = await newVerification(token);
        if (!res.success) return setError(res.error);
        setSuccess(res.success);
      } catch {
        setError('Something went wrong while verifying your email.');
      }
    };
    verify();
  }, [error, success, token]);

  return (
    <CardContent
      className={cn(
        'flex w-full flex-col justify-center',
        error ? 'items-start' : 'items-center'
      )}
    >
      {success ? (
        <div className='mb-4 leading-none'>
          Your email has been verified! You may now{' '}
          <Button variant='link' className='p-0 text-base' asChild>
            <Link href='/auth/sign-in'>sign in</Link>
          </Button>{' '}
          to your account.
        </div>
      ) : error ? (
        <>
          <Alert variant='destructive'>
            <OctagonAlertIcon />
            <AlertText>{error}</AlertText>
          </Alert>
          <Button variant='link' className='p-0' asChild>
            <Link href='/auth/sign-in'>Sign in</Link>
          </Button>
        </>
      ) : (
        <Spinner className='size-8' />
      )}
    </CardContent>
  );
};
