import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  modal: boolean;
}

const initialState: ModalState = { modal: false };

export const maodalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = maodalSlice.actions;

export default maodalSlice.reducer;
