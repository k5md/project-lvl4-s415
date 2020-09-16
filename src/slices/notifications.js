import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    create: (state, { payload }) => state.concat({ ...payload, id: uniqueId() }),
    remove: (state, { payload: { id } }) => state.filter(
      (notification) => notification.id === id,
    ),
  },
});

export const { create, remove } = notificationsSlice.actions;

export default notificationsSlice.reducer;
