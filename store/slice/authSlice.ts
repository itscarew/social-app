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
      state.authUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthUser } = authSlice.actions;

export default authSlice.reducer;
