// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const savedUser = JSON.parse(localStorage.getItem('user'));

const preloadedState = {
  user: {
    user: savedUser || null,
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});

export default store;
