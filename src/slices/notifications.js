import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    createNotification: (state, { payload }) => state.concat({ ...payload, id: uniqueId() }),
    removeNotification: (state, { payload: { id } }) => state.filter(
      (notification) => notification.id === id,
    ),
  },
});

export const { createNotification, removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
