import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';
import routes from '../routes';
import { add } from './notifications';

export const sendMessage = createAsyncThunk(
  'messages/createMessage',
  async (message, { dispatch }) => {
    const { channelId, body, author } = message;
    try {
      const requestData = { data: { attributes: { author, body } } };
      const request = { method: 'POST', url: routes.channelMessagesPath(channelId), data: requestData };
      await axios(request);
    } catch (err) {
      const notification = { id: uniqueId(), type: 'Error', message: err.message };
      dispatch(add(notification));
      throw err;
    }
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    initialize: (state, { payload: { messages } }) => messages,
    addMessage: (state, { payload }) => state.concat(payload),
  },
});

export const { initialize, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
