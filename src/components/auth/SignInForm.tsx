'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SocialButtons } from './SocialButtons';
import { FooterLink } from './FooterLink';
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
import { signInSchema, type SignInValues } from '@/schemas/auth';

export const SignInForm = () => {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSubmit = (values: SignInValues) => {
    // TODO: Submit form
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className='space-y-2'>
          <SocialButtons />
          <SeparatorWithText>OR</SeparatorWithText>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type='email' />
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
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className='flex-col items-start gap-2'>
          <Button type='submit' className='w-full'>
            Login
          </Button>
          <FooterLink
            beforeText="Don't have an account? "
            text='Sign up'
            href='/auth/sign-up'
          />
        </CardFooter>
      </form>
    </Form>
  );
};
