import { CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

const AuthLoading = () => (
  <CardContent className='flex w-full items-center justify-center pt-6'>
    <Spinner className='size-8' />
  </CardContent>
);

export default AuthLoading;
