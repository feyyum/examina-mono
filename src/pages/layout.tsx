import { useSession } from '@/hooks/useSession';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

// Components

// Custom hooks
// ! - This is a custom hook that is not yet implemented
// import { useContractStatus } from '../../hooks/useContractStatus';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  useSession();

  return (
    <div>
      <Analytics />
      <main>{children}</main>
      <Toaster position="top-left" />
    </div>
  );
}

export default Layout;
