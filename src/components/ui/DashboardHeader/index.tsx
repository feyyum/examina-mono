import styles from '@/styles/components/DashboardHeader.module.css';
import Image from 'next/image';

// Images
import Choz from '@/icons/choz.svg';
import Avatar from '@/icons/profile_image.svg';

function DashboardHeader() {
  return (
    <div className={styles.dashboard_header}>
      <div className={styles.container}>
        <Image src={Choz} alt="" className={styles.logo} />
        <div className={styles.header_nav_container}>
          <a href="#" className={`${styles.header_nav_item} ${styles.header_nav_item_active}`}>
            Assesments
          </a>
        </div>
        <div className={styles.profile_container}>
          <p className={styles.wallet_address}>B62a...dsad</p>
          <Image src={Avatar} alt="" />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
