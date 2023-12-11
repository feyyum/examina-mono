import styles from "./Sidebar.module.css";
import React from "react";
import Image from "next/image";

import Home from "../../../icons/home.svg";
import Edit from "../../../icons/edit.svg";
import Stats from "../../../icons/stats.svg";
import Circle from "../../../icons/circle.svg";
import Settings from "../../../icons/settings.svg";

type Props = {};

function Sidebar({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.general_container}>
        <h1 className={styles.section_title}>GENERAL</h1>
        <div className={styles.subtitles}>
          <div className={styles.section_subtitle_container}>
            <Image src={Home} alt="icon" />
            <h3 className={styles.section_subtitle}>Home Page</h3>
          </div>
          <div className={styles.section_subtitle_container}>
            <Image src={Edit} alt="icon" />
            <h3 className={styles.section_subtitle}>Create Exam</h3>
          </div>
          <div className={styles.section_subtitle_container}>
            <Image src={Stats} alt="icon" />
            <h3 className={styles.section_subtitle}>Your Assesments</h3>
          </div>
        </div>
      </div>
      <div className={styles.personal_container}>
        <h1 className={styles.section_title}>PERSONAL</h1>
        <div className={styles.subtitles}>
          <div className={styles.section_subtitle_container}>
            <Image src={Circle} alt="icon" />
            <h3 className={styles.section_subtitle}>Your Profile</h3>
          </div>
          <div className={styles.section_subtitle_container}>
            <Image src={Settings} alt="icon" />
            <h3 className={styles.section_subtitle}>Account Settings</h3>
          </div>
        </div>
      </div>
      <div className={styles.support_container}>
        <h1 className={styles.section_title}>SUPPORT</h1>
        <div className={styles.subtitles}>
          <div className={styles.section_subtitle_container}>
            <Image src={Circle} alt="icon" />
            <h3 className={styles.section_subtitle}>F.A.Q.</h3>
          </div>
          <div className={styles.section_subtitle_container}>
            <Image src={Circle} alt="icon" />
            <h3 className={styles.section_subtitle}>Help Center</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
