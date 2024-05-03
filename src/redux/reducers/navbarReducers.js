import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isOpen = !state.isOpen; // Mengubah nilai isOpen menjadi kebalikan dari nilai sebelumnya
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
