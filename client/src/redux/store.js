import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";

import  userReducer from "./user"


export const store = configureStore({
  reducer: {
    auth: authReducer,
  
    users : userReducer,
  
  },
  middleware: [...getDefaultMiddleware()],
});
