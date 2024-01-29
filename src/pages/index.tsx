import Image from "next/image";
import styles from "../styles/Landing.module.css";

// Components
import { SidebarButton } from "@/components/ui/Buttons";

// Images
import BG from "@/images/landing-bg.svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.landing_header_container}>
        <div className={styles.logo_container}>
          <h1 className={styles.logo_primary}>
            exa<span className={styles.logo_secondary}>mina</span>
          </h1>
        </div>
        <div className={styles.button_container}>
          <SidebarButton label="Connect Wallet" active />
        </div>
      </div>
      <div className={styles.landing_content_container}>
        <Image src={BG} alt="Landing Background" className={styles.bg_image} />
        <div className={styles.content_container}>
          <h3 className={styles.subtitle}>
            Blockchain-Powered Security for Seamless and Verified Examinations
          </h3>
          <h1 className={styles.title}>
            Mina Protocol: Elevating <br /> Examina's Trust and Reliability
          </h1>
          <div>
            <div className={styles.button}>
              <h3 className={styles.button_label}>Get Started</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
