import { NewPasswordForm } from '@/components/auth/NewPasswordForm';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import React from 'react';

const NewPasswordPage = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Choose a new password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <NewPasswordForm />
    </>
  );
};

export default NewPasswordPage;
