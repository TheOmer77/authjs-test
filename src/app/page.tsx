import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { SignInButton } from '@/components/auth/SignInButton';

const Home = () => (
  <main
    className='flex h-full flex-col items-center justify-center bg-background
bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-primary/30
to-primary dark:from-primary/70 dark:to-primary/10'
  >
    <div className='space-y-6 text-center'>
      <Logo />
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
