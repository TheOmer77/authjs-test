'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';

const navTabs = ['Server', 'Client', 'Admin', 'Settings'];

export const NavbarTabs = () => {
  const pathname = usePathname();
  return (
    <Tabs value={pathname.slice(1)}>
      <TabsList>
        {navTabs.map(tab => (
          <TabsTrigger
            key={tab.toLowerCase()}
            value={tab.toLowerCase()}
            asChild
          >
            <Link href={`/${tab.toLowerCase()}`}>{tab}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
