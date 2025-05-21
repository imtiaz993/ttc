import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";
import userReducer from "./slices/userSlice";
import stepperReducer from "./slices/progressSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    user: userReducer,
    stepper: stepperReducer,
  },
});
