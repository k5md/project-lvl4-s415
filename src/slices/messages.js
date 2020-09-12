import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messagesList: [],
  },
  reducers: {
    initialize: (_state, { payload: { messages } }) => ({
      messagesList: messages,
    }),
  },
});

export const { initialize } = messagesSlice.actions;

export default messagesSlice.reducer;
