import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    user: userReducer,
  },
});