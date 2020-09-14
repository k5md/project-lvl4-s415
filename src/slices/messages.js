import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uniqueId } from 'lodash';
import routes from '../routes';
import { add } from './notifications';

export const sendMessage = createAsyncThunk(
  'messages/createMessage',
  async (message, { rejectWithValue, dispatch }) => {
    const { channelId, body, author } = message;
    try {
      const requestData = { data: { attributes: { author, body } } };
      const request = { method: 'POST', url: routes.channelMessagesPath(channelId), data: requestData };
      const response = await axios(request);
      const createdMessage = response.data.data.attributes;
      return createdMessage;
    } catch (err) {
      const notification = { id: uniqueId(), type: 'Error', message: err.response.data };
      dispatch(add(notification));
      return rejectWithValue(err.response.data);
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
  extraReducers: {
    [sendMessage.fulfilled]: (state, { payload }) => state.concat(payload),
  },
});

export const { initialize, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
