import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { SignInButton } from '@/components/auth/SignInButton';

const Home = () => (
  <main className='flex h-full flex-col items-center justify-center'>
    <div className='space-y-6 text-center'>
      <Logo className='text-6xl text-white drop-shadow-md' />
      <SignInButton>
        <Button
          variant='secondary'
          size='lg'
          className='bg-background text-foreground'
        >
          Sign in
        </Button>
      </SignInButton>
    </div>
  </main>
);

export default Home;
