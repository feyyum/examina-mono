import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
export interface AccountSlice {
  wallets: string[];
}

// Define the initial state using that type
const initialState = {
  wallets: [],
} as AccountSlice;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<AccountSlice>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setWallet } = accountSlice.actions;

export const selectWallet = (state: RootState) => state.account.wallets[0];

export default accountSlice.reducer;
