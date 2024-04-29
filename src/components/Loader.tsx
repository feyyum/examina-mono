import React from 'react';

// Types
import { ContractStatus } from '../../hooks/auth';

const Loader = (contract: ContractStatus) => {
  if (contract.error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div>Loader</div>
      <div>{contract.status}</div>
    </div>
  );
};

export default Loader;
