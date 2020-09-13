/* eslint-disable import/prefer-default-export */

import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { UserContext } from '../../lib/user';

export const useChannels = () => useSelector(({ channels }) => channels);

export const useMessages = () => useSelector(({ messages }) => messages);
export const useMessagesList = (channelId) => useSelector(
  ({ messages: { messagesList } }) => messagesList.filter(
    (message) => message.channelId === channelId,
  ),
);

export const useUser = () => useContext(UserContext);
