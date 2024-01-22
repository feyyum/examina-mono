"use client";
import styles from "@/styles/components/Sidebar.module.css";
import Image from "next/image";

// Components
import * as Separator from "@radix-ui/react-separator";

// Icons
import {
  HomeIcon,
  Pencil1Icon,
  BarChartIcon,
  PersonIcon,
  GearIcon,
} from "@radix-ui/react-icons";

// Custom Components
import { SidebarButton } from "../Buttons";

type Props = {};

function Sidebar({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <h1 className={styles.logo_primary}>
          exa<span className={styles.logo_secondary}>mina</span>
        </h1>
      </div>
      <Separator.Root className={styles.separator} />
      <div className={styles.sidebar_nav_container}>
        <SidebarButton label="Home Page" Icon={HomeIcon} />
        <SidebarButton label="Create Exam" Icon={Pencil1Icon} />
        <SidebarButton label="Your Exams" Icon={BarChartIcon} />
        <SidebarButton label="Home Profile" Icon={PersonIcon} />
        <SidebarButton label="Settings" Icon={GearIcon} active />
      </div>
      <div></div>
    </div>
  );
}

export default Sidebar;
