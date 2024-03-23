import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/Toast';
import { auth } from '@/lib/auth';
import '@/styles/index.css';

const font = Manrope({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: { template: '%s - The Auth Thing', default: 'The Auth Thing' },
};

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='en' className={font.variable}>
        <body>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;
