import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogoutModal: false,
  showDropdown: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowLogoutModal: (state) => {
      state.showLogoutModal = !state.showLogoutModal;
    },
    setShowDropdown: (state) => {
      state.showDropdown = !state.showDropdown;
    },
  },
});

export const { setShowDropdown, setShowLogoutModal } = modalSlice.actions;
export default modalSlice.reducer;
