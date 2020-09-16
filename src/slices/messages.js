import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';
import routes from '../routes';
import { create as createNotification } from './notifications';

export const createMessage = createAsyncThunk(
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
    initialize: (state, { payload: { messages } }) => messages,
    create: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { initialize, create } = messagesSlice.actions;

export default messagesSlice.reducer;
