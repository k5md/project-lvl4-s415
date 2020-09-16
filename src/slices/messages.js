import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { createNotification } from './notifications';
import api from '../api';

export const createMessageRequest = createAsyncThunk(
  'messages/createMessage',
  async (message, { dispatch }) => {
    const { channelId, body, author } = message;
    try {
      await api.createMessage({ channelId, body, author });
    } catch (err) {
      const notification = { id: uniqueId(), type: 'error', message: err.message };
      dispatch(createNotification(notification));
      throw err;
    }
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    initializeMessages: (state, { payload: { messages } }) => messages,
    createMessage: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { initializeMessages, createMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
