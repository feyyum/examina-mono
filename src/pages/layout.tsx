import styles from "../styles/app/Layout.module.css";
import React from "react";

// Components
import Loader from "@/components/Loader";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import RightSidebar from "@/components/ui/RightSidebar";

// Custom hooks
import { useContractStatus } from "../hooks/useContractStatus";

type Props = {
  children: React.ReactNode;
  isWrapped?: boolean;
};

function Layout({ children, isWrapped = true }: Props) {
  // const contract = useContractStatus();

  // if (contract.status !== "done" || contract.error) {
  //   return <Loader {...contract} />;
  // }

  if (isWrapped) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content_container}>
          <Header />
          <main className={styles.content}>{children}</main>
        </div>
        <RightSidebar />
      </div>
    );
  }

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
