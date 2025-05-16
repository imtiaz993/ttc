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
  },
});

export const { setUserData, toggleMute, closeMenu } = userSlice.actions;
export default userSlice.reducer;
