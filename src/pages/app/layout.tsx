import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";

// O1JS imports
import ZkappWorkerClient from "../zkappWorkerClient";
import { PublicKey } from "o1js";

// Redux imports
import { setClient } from "../../../features/client/client";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const dispatch = useAppDispatch();

  // Redux state
  const state = useAppSelector((state) => state.client);

  // Do Setup
  useEffect(() => {
    async function timeout(seconds: number): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }

    (async () => {
      if (!state.hasBeenSetup) {
        console.log("Loading web worker...");
        const zkappWorkerClient = new ZkappWorkerClient();
        await timeout(5);

        console.log("Done loading web worker");

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (mina == null) {
          dispatch(setClient({ ...state, hasWallet: false }));
          return;
        }

        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        console.log(`Using key:${publicKey.toBase58()}`);

        console.log("Checking if fee payer account exists...");

        const res = await zkappWorkerClient.fetchAccount({
          publicKey: publicKey!,
        });

        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();

        console.log("Compiling zkApp...");

        await zkappWorkerClient.compileContract();
        console.log("zkApp compiled");

        const zkappPublicKey = PublicKey.fromBase58(
          "B62qo2Be4Udo5EG1ux9yMJVkXe9Gz945cocN7Bn4W9DSYyeHZr1C3Ea"
        );

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        console.log("Getting zkApp state...");
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey });
        const currentNum = await zkappWorkerClient.getNum();
        console.log(`Current state in zkApp: ${currentNum.toString()}`);

        dispatch(
          setClient({
            ...state,
            zkappWorkerClient,
            hasWallet: true,
            hasBeenSetup: true,
            publicKey,
            zkappPublicKey,
            accountExists,
            currentNum,
          })
        );
      }
    })();
  }, []);

  // Wait for account to exist, if it didn't
  useEffect(() => {
    (async () => {
      if (state.hasBeenSetup && !state.accountExists) {
        for (;;) {
          console.log("Checking if fee payer account exists...");
          const res = await state.zkappWorkerClient!.fetchAccount({
            publicKey: state.publicKey!,
          });
          const accountExists = res.error == null;
          if (accountExists) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        dispatch(setClient({ ...state, accountExists: true }));
      }
    })();
  }, [state.hasBeenSetup]);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
