import { NavbarTabs } from './navbar-tabs';
import { UserButton } from './user-button';
import { Card } from '@/components/ui/Card';

export const Navbar = () => {
  return (
    <Card asChild className='flex w-full max-w-md flex-row justify-between p-2'>
      <nav>
        <NavbarTabs />
        <UserButton />
      </nav>
    </Card>
  );
};
