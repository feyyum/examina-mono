import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

import ZkappWorkerClient from "@/workers/zkappWorkerClient";
import { PublicKey, Field } from "o1js";

// Define a type for the slice state
export interface ClientState {
  zkappWorkerClient: null | ZkappWorkerClient;
  hasWallet: null | boolean;
  hasBeenSetup: boolean;
  accountExists: boolean;
  currentNum: null | Field;
  publicKey: null | PublicKey;
  zkappPublicKey: null | PublicKey;
  creatingTransaction: boolean;
}

// Define the initial state using that type
const initialState = {
  zkappWorkerClient: null,
  hasWallet: null,
  hasBeenSetup: false,
  accountExists: false,
  currentNum: null,
  publicKey: null,
  zkappPublicKey: null,
  creatingTransaction: false,
} as ClientState;

export const clientSlice = createSlice({
  name: "client",
  // `clientSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    setClient: (state, action: PayloadAction<ClientState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setClient } = clientSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectContract = (state: RootState) =>
  state.client.zkappWorkerClient;

export default clientSlice.reducer;
