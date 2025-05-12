import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      name: "",
      sound: false,
      char: "char1",
      tooltip: false,
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
    playMusic: (state) => {
      // Handled in component due to Audio API
    },
  },
});

export const { setUserData, toggleMute, playMusic } = userSlice.actions;
export default userSlice.reducer;