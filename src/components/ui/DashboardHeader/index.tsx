import styles from '@/styles/components/DashboardHeader.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';

// Images
import Choz from '@/icons/choz.svg';
import Avatar from '@/icons/profile_image.svg';
import { logout } from '@/lib/Client/Auth';
import toast from 'react-hot-toast';

function DashboardHeader({ withoutNav = false }) {
  const session = useSelector((state: any) => state.session);

  return (
    <div className={styles.dashboard_header}>
      <div className={styles.container}>
        <a href="https://choz.io/">
          <Image src={Choz} alt="" className={styles.logo} />
        </a>
        {withoutNav === false && (
          <div className={styles.header_nav_container}>
            <p className={`${styles.header_nav_item} ${styles.header_nav_item_active}`}>
              Assesments
            </p>
          </div>
        )}
        <div className={styles.profile_container}>
          <div>
            <a
              href={`https://minascan.io/mainnet/account/${session?.walletAddress}/`}
              target="_blank"
              className={styles.wallet_address}
            >
              {session.walletAddress &&
                `${(session.walletAddress as string).slice(0, 5)}...${(
                  session.walletAddress as string
                ).slice(-5)}`}
            </a>
            <p
              className={styles.logout}
              onClick={() =>
                logout().then(() => {
                  toast.success('Logged out successfully');
                  window.location.href = '/';
                })
              }
            >
              Logout
            </p>
          </div>
          <Image src={Avatar} alt="" />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
