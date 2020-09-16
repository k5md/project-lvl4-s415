import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: null,
  reducers: {
    openModal: ((state, { payload }) => payload),
    closeModal: () => null,
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
