import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogoutModal: false,
  showDropdown: false,
  profileModalOpen: false,
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
    setProfileModalOpen: (state) => {
      state.profileModalOpen = !state.profileModalOpen;
    },
  },
});

export const { setShowDropdown, setShowLogoutModal, setProfileModalOpen } =
  modalSlice.actions;
export default modalSlice.reducer;
