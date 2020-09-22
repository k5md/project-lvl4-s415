import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channels';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    createMessage: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: {
    [removeChannel]: (state, { payload: { id } }) => state
      .filter((message) => message.channelId !== id),
  },
});

export const { initializeMessages, createMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
