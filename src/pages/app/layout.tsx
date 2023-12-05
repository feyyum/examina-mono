import React from "react";

// Custom hooks
import { useContractStatus } from "../../../hooks/useContractStatus";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const status = useContractStatus();
  console.log("STATUS", status);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
