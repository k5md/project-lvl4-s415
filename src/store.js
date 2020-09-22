import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices';

export default (initialState) => {
  const store = configureStore({
    reducer,
    preloadedState: initialState,
  });
  return store;
};
