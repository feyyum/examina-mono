import styles from '../styles/app/Layout.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import toast, { Toaster } from 'react-hot-toast';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

// Components
import { useQuery } from '@tanstack/react-query';
import { getSession, logout } from '@/lib/Client/Auth';
import { setSession } from '../../features/client/session';

// Custom hooks
// ! - This is a custom hook that is not yet implemented
// import { useContractStatus } from '../../hooks/useContractStatus';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const session = useSelector((state: RootState) => state.session);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    // @ts-ignore
    cacheTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    refetch();
  }, [router.pathname]);

  useEffect(() => {
    if (rendered && !isLoading && router.pathname !== '/') {
      (window as any)?.mina.getAccounts().then((accounts: string[]) => {
        if (data && accounts.length === 0) {
          logout().then(() => {
            dispatch(setSession(new Object() as any));
            toast.error('Please connect wallet to continue.');
            router.push('/');
          });
          return;
        }

        if (!data && accounts.length === 0) {
          dispatch(setSession(new Object() as any));
          toast.error('Please login to continue.');
          router.push('/');
          return;
        }

        if (data && accounts.length > 0) {
          if (accounts[0] !== (data as any).session.walletAddress) {
            logout().then(() => {
              dispatch(setSession(new Object() as any));
              toast.error('Please login to continue.');
              router.push('/');
            });
            return;
          }
          dispatch(setSession((data as any).session));
          return;
        }

        if (!data && accounts.length > 0) {
          dispatch(setSession(new Object() as any));
          toast.error('Please sign message while authentication to continue.');
          router.push('/');
          return;
        }
      });
    }

    if (rendered && !isLoading && router.pathname == '/') {
      (window as any)?.mina.getAccounts().then((accounts: string[]) => {
        if (data && accounts.length > 0) {
          if (accounts[0] !== (data as any).session.walletAddress) {
            logout().then(() => {
              dispatch(setSession(new Object() as any));
            });
            return;
          }
          dispatch(setSession((data as any).session));
          return;
        }
      });
    }
  }, [rendered, isLoading, router.pathname]);

  return (
    <div>
      <main>{children}</main>
      <Toaster position="top-left" />
    </div>
  );
}

export default Layout;
