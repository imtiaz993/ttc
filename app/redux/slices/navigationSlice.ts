import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    step: 0,
  },
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetStep: (state) => {
      state.step = 0;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { nextStep, prevStep, resetStep, setStep } = navigationSlice.actions;
export default navigationSlice.reducer;