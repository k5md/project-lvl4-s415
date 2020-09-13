import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const sendMessage = createAsyncThunk(
  'messages/createMessage',
  async (message, { rejectWithValue }) => {
    const { channelId, body, author } = message;
    try {
      const requestData = { data: { attributes: { author, body } } };
      const request = { method: 'POST', url: routes.channelMessagesPath(channelId), data: requestData };
      const response = await axios(request);
      const createdMessage = response.data.data.attributes;
      return createdMessage;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

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
  extraReducers: {
    [sendMessage.fulfilled]: (state, { payload }) => ({
      ...state,
      messagesList: state.messagesList.concat(payload),
    }),
  },
});

export const { initialize } = messagesSlice.actions;

export default messagesSlice.reducer;
