import React from "react";
import Loader from "@/components/Loader";

// Custom hooks
import { useContractStatus } from "../../../hooks/useContractStatus";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const contract = useContractStatus();

  if (contract.status !== "done" || contract.error) {
    return <Loader {...contract} />;
  }

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
