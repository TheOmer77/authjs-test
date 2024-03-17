import { Logo } from '@/components/layout/Logo';

const Home = () => (
  <main
    className='flex h-full flex-col items-center justify-center bg-background
bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-primary/30
to-primary dark:from-primary/70 dark:to-primary/10'
  >
    <div className='space-6'>
      <Logo />
    </div>
  </main>
);

export default Home;
