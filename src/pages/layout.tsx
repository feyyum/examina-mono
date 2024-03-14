import styles from '../styles/app/Layout.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

// Components
// import Loader from '@/components/Loader';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import { setWallet } from '../../features/client/account';
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

  const [rendered, setRendered] = useState(false);

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

  useEffect(() => {
    if (rendered && account.wallets.length === 0 && router.pathname !== '/') {
      router.push('/');
    }
  }, [rendered, account.wallets, router.pathname]);

  useEffect(() => {
    (window as any).mina?.on('accountsChanged', (accounts: string[]) => {
      dispatch(setWallet({ wallets: accounts }));
    });

    return () => {
      (window as any).mina?.removeAllListeners('accountsChanged');
    };
  }, []);

  if (router.pathname === '/') {
    return (
      <div>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content_container}>
        <Header />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
