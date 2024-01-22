import styles from "../styles/app/Layout.module.css";
import React from "react";

// Components
import Loader from "@/components/Loader";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";

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
        {/* <Header /> */}
        <div className={styles.content_container}>
          <Sidebar />
          <main className={styles.content}>{children}</main>
        </div>
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
