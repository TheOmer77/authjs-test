import { NavbarTabs } from './navbar-tabs';
import { UserButton } from './user-button';

export const Navbar = () => {
  return (
    <nav
      className='flex w-full max-w-md flex-row justify-between rounded-lg
border bg-card p-2'
    >
      <NavbarTabs />
      <UserButton />
    </nav>
  );
};
