import { createSelector } from '@reduxjs/toolkit';

export const selectChannels = ({ channels }) => channels;

export const selectMessages = ({ messages }) => messages;
export const selectMessagesList = (channelId) => createSelector(
  selectMessages,
  (messages) => messages.filter((message) => message.channelId === channelId),
);

export const selectNotifications = ({ notifications }) => notifications;

export const selectModals = ({ modals }) => modals;
