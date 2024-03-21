'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';

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
import { useToast } from '@/hooks/useToast';
import { settings } from '@/actions/settings';
import { settingsSchema, type SettingsValues } from '@/schemas/settings';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const SettingsForm = () => {
  const currentUser = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const { displayToast } = useToast();

  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: currentUser?.name || undefined },
  });

  const handleSubmit = (values: SettingsValues) => {
    startTransition(async () => {
      const res = await settings(values);
      if (!res.success) {
        displayToast(res.error, { variant: 'destructive' });
        return;
      }
      update();
      displayToast('User updated successfully.');
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
        </CardContent>
        <CardFooter className='justify-end'>
          <Button type='submit' disabled={isPending}>
            Save
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default SettingsForm;
