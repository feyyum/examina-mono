import styles from "@/styles/components/Header.module.css";
import React from "react";
import Image from "next/image";

import Bell from "../../../icons/bell.svg";
import Stock from "../../../icons/stock.svg";

type Props = {};

function Header({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.logo_container}>
          <h1 className={styles.logo}>
            exa<span>mina</span>
          </h1>
        </div>
        <div className={styles.controller_container}>
          <div className={styles.bell_container}>
            <Image src={Bell} alt="bell" className={styles.bell_icon} />
          </div>
          <div className={styles.user_container}>
            <Image
              src={Stock}
              alt="stock_image"
              className={styles.profile_picture}
            />
            <h3 className={styles.username}>Kelley Hansen</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
