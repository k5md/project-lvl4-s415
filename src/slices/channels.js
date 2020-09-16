/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import axios from 'axios';
import routes from '../routes';
import { createNotification } from './notifications';

export const createChannelRequest = createAsyncThunk(
  'channels/create',
  async ({ name }, { dispatch }) => {
    try {
      const requestData = { data: { attributes: { name } } };
      const request = { method: 'POST', url: routes.channelsPath(), data: requestData };
      await axios(request);
    } catch (err) {
      const notification = { id: uniqueId(), type: 'error', message: err.message };
      dispatch(createNotification(notification));
      throw err;
    }
  },
);

export const removeChannelRequest = createAsyncThunk(
  'channels/remove',
  async ({ id }, { dispatch }) => {
    try {
      const request = { method: 'DELETE', url: routes.channelPath(id) };
      await axios(request);
    } catch (err) {
      const notification = { id: uniqueId(), type: 'error', message: err.message };
      dispatch(createNotification(notification));
      throw err;
    }
  },
);

export const renameChannelRequest = createAsyncThunk(
  'channels/rename',
  async ({ id, name }, { dispatch }) => {
    try {
      const requestData = { data: { attributes: { name } } };
      const request = { method: 'PATCH', url: routes.channelPath(id), data: requestData };
      await axios(request);
    } catch (err) {
      const notification = { id: uniqueId(), type: 'error', message: err.message };
      dispatch(createNotification(notification));
      throw err;
    }
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: null,
  },
  reducers: {
    initializeChannels: (state, { payload: { channels, currentChannelId } }) => {
      state.channelsList = channels;
      state.currentChannelId = currentChannelId;
    },
    createChannel: (state, { payload }) => {
      state.channelsList.push(payload);
      state.currentChannelId = payload.id;
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channelsList = state.channelsList.filter((channel) => channel.id !== id);
      state.currentChannelId = state.currentChannelId !== id ? state.currentChannelId : null;
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const targetChannel = state.channelsList.find((channel) => channel.id === id);
      targetChannel.name = name;
    },
    setCurrentChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
});

export const {
  initializeChannels,
  createChannel,
  removeChannel,
  renameChannel,
  setCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
