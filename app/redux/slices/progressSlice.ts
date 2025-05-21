import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  iswhite: false,
  showCamera: false,
  showNext: true,
  showPrev: true,
  reduceProgress: 0,
  onCameraClick: () => {},
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setStepperProps: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetStepperProps: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setStepperProps, resetStepperProps } = stepperSlice.actions;
export default stepperSlice.reducer;
