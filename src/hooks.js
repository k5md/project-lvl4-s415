import { useSelector } from 'react-redux';

export const useChannels = () => useSelector(({ channels }) => channels);

export const useMessages = () => useSelector(({ messages }) => messages);
export const useMessagesList = (channelId) => useSelector(
  ({ messages }) => messages.filter((message) => message.channelId === channelId),
);

export const useNotifications = () => useSelector(({ notifications }) => notifications);

export const useModals = () => useSelector(({ modals }) => modals);
