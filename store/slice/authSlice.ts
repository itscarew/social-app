import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  authUser: any;
}

const initialState: AuthState = {
  authUser: {},
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<object>) => {
      state.authUser = { ...state.authUser, ...action.payload };
    },
    clearAUthUser: (state) => {
      state.authUser = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthUser, clearAUthUser } = authSlice.actions;

export default authSlice.reducer;
