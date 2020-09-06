import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: null,
  },
  reducers: {
    initialize: (_state, { payload: { channels, currentChannelId } }) => ({
      channelsList: channels,
      currentChannelId,
    }),
  },
});

export const { initialize } = channelsSlice.actions;

export default channelsSlice.reducer;
