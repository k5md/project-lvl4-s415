/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { createNotification } from './notifications';
import api from '../api';

export const createChannelRequest = createAsyncThunk(
  'channels/create',
  async ({ name }, { dispatch }) => {
    try {
      await api.createChannel({ name });
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
      await api.removeChannel({ id });
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
      await api.renameChannel({ id, name });
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
