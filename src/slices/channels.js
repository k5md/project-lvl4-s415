import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: null,
  },
  reducers: {
    initialize: (state, { payload: { channels, currentChannelId } }) => ({
      ...state,
      channelsList: channels,
      currentChannelId,
    }),
  },
});

export const { initialize } = channelsSlice.actions;

export default channelsSlice.reducer;
