import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  isNavOpen: boolean;
};

const initialState: UiState = {
  isNavOpen: false
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNavOpen: (state) => {
      state.isNavOpen = !state.isNavOpen;
    },
    openNav: (state) => {
      state.isNavOpen = true;
    },
    closeNav: (state) => {
      state.isNavOpen = false;
    }
  }
});

export const { toggleNavOpen, openNav, closeNav } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;