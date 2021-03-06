import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Rollbar from 'rollbar';
import createStore from './store';
import {
  createChannel,
  removeChannel,
  renameChannel,
} from './slices/channels';
import { createMessage } from './slices/messages';
import Chat from './components/Chat';
import { UserProvider } from './UserContext';
import initializeUser from '../lib/user';
import { createNotification } from './slices/notifications';
import locales from './locales';
import api from './api';
import ErrorBoundary from './components/ErrorBoundary';

export default (container, gon) => {
  const errorReporter = new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN || '',
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: process.env.NODE_ENV === 'production',
    payload: {
      environment: process.env.NODE_ENV,
    },
  });

  i18n
    .use(initReactI18next)
    .init({
      resources: locales,
      lng: 'en',
    });

  const store = createStore({
    channels: {
      channelsList: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messages: gon.messages,
  });

  const user = initializeUser();

  const socket = io();
  socket.on('connect', () => store.dispatch(createNotification({ type: 'note', message: 'connected' })));
  socket.on('newMessage', (data) => store.dispatch(createMessage(api.newMessageSocket(data))));
  socket.on('newChannel', (data) => store.dispatch(createChannel(api.newChannelSocket(data))));
  socket.on('removeChannel', (data) => store.dispatch(removeChannel(api.removeChannelSocket(data))));
  socket.on('renameChannel', (data) => store.dispatch(renameChannel(api.renameChannelSocket(data))));

  ReactDOM.render(
    <ErrorBoundary errorReporter={errorReporter}>
      <Provider store={store}>
        <UserProvider value={user}>
          <Chat />
        </UserProvider>
      </Provider>
    </ErrorBoundary>, container,
  );
};
