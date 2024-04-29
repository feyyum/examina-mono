import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
export interface SessionSlice {
  session: {
    userId: string;
    walletAddress: string;
  };
}

// Define the initial state using that type
const initialState = {
  session: {},
} as SessionSlice;

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionSlice>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setSession } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;

export default sessionSlice.reducer;
