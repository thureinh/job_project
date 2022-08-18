import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice';
import locationReducer from '../features/locationSlice';
import routeReducer from '../features/routeSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    location: locationReducer,
    route: routeReducer,
  },
});
