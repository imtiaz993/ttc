import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      name: "",
      sound: false,
      char: "char1",
      tooltip: false,
      menu: true,
      overlay: true,
      email: "",
      feedback: "",
      createdTika: ""
    },
    isMuted: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    toggleMute: (state, action) => {
      state.isMuted = action.payload;
      state.userData.sound = !action.payload;
    },
    closeMenu: (state) => {
      state.userData.menu = false;
    },
    closeOverlay: (state) => {
      state.userData.overlay = false;
    },
  },
});

export const { setUserData, toggleMute, closeMenu, closeOverlay } =
  userSlice.actions;
export default userSlice.reducer;
