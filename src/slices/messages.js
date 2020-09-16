import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';
import routes from '../routes';
import { createNotification } from './notifications';

export const createMessageRequest = createAsyncThunk(
  'messages/createMessage',
  async (message, { dispatch }) => {
    const { channelId, body, author } = message;
    try {
      const requestData = { data: { attributes: { author, body } } };
      const request = { method: 'POST', url: routes.channelMessagesPath(channelId), data: requestData };
      await axios(request);
    } catch (err) {
      const notification = { id: uniqueId(), type: 'Error', message: err.message };
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
