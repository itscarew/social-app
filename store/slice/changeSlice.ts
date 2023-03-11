import { createSlice } from "@reduxjs/toolkit";

export interface ChangeState {
  value: boolean;
}

const initialState: ChangeState = { value: false };

export const changeSlice = createSlice({
  name: "change",
  initialState,
  reducers: {
    togleChange: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { togleChange } = changeSlice.actions;

export default changeSlice.reducer;
