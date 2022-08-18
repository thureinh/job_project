import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice';
import locationReducer from '../features/locationSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    location: locationReducer,
  },
});
