import { configureStore } from '@reduxjs/toolkit';
import voicesReducer from './voicesSlice';

const store = configureStore({
  reducer: {
    voices: voicesReducer,
  },
});

export default store;
