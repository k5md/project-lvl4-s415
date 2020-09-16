import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: null,
  reducers: {
    open: ((state, { payload }) => payload),
    close: () => null,
  },
});

export const { open, close } = modalsSlice.actions;

export default modalsSlice.reducer;
