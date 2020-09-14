import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    add: (state, { payload }) => state.concat({ ...payload, id: uniqueId() }),
    remove: (state, { payload: { id } }) => state.filter((notification) => notification.id === id),
  },
});

export const { add, remove } = notificationsSlice.actions;

export default notificationsSlice.reducer;
