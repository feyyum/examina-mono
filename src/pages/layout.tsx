import styles from '../styles/app/Layout.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

// Components
// import Loader from '@/components/Loader';
import { setWallet } from '../../features/client/account';
import { onChangeWallet } from '../../hooks/useContractStatus';
// import RightSidebar from "@/components/ui/RightSidebar";

// Custom hooks
// ! - This is a custom hook that is not yet implemented
// import { useContractStatus } from '../../hooks/useContractStatus';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const router = useRouter();

  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account);

  console.log('ACCOUNT', account);

  const [rendered, setRendered] = useState(false);

  // Get Wallets
  useEffect(() => {
    if ((window as any) && (window as any).mina === undefined) {
      setRendered(true);
      return;
    }

    if ((window as any).mina !== undefined) {
      (window as any).mina.getAccounts().then((accounts: string[]) => {
        console.log('Accounts:', accounts);
        dispatch(setWallet({ wallets: accounts }));
        setRendered(true);
      });
      return;
    }
  }, []);

  // Redirect to home if no wallets
  useEffect(() => {
    if ((rendered && account.wallets.length === 0 && router.pathname !== '/') || isMobile) {
      if (router.pathname.includes('get-started')) {
        return;
      }
      router.push('/');
    }
  }, [rendered, account.wallets, router.pathname]);

  // Handle Wallet Change
  useEffect(() => {
    (window as any).mina?.on('accountsChanged', (accounts: string[]) => {
      if (account.wallets.length === 0) {
        return;
      }
      onChangeWallet(accounts).then(() => {
        dispatch(setWallet({ wallets: accounts }));
      });
    });

    return () => {
      (window as any).mina?.removeAllListeners('accountsChanged');
    };
  }, [account]);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
