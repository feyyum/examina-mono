import React from 'react';
import Loader from '@/components/Loader';
// Custom hooks
import { useContractStatus } from '../../../hooks/auth';

function Layout({ children }: { children: React.ReactNode }) {
  const contract = useContractStatus();

  if (contract.status !== 'done' || contract.error) {
    return <Loader {...contract} />;
  }

  return <>{children}</>;
}

export default Layout;
