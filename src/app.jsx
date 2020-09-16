import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Rollbar from 'rollbar';
import store from './store';
import {
  initializeChannels,
  createChannel,
  removeChannel,
  renameChannel,
} from './slices/channels';
import { initializeMessages, createMessage } from './slices/messages';
import Chat from './components/Chat';
import { UserProvider } from './components/UserContext';
import initializeUser from '../lib/user';
import { createNotification } from './slices/notifications';
import locales from './locales';
import api from './api';
import ErrorBoundary from './components/ErrorBoundary';

export default (container, gon) => {
  const errorReporter = new Rollbar({
    accessToken: '265bfdaa6f2548c4bcc796a94ec8e27e',
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: process.env.NODE_ENV === 'production',
  });

  i18n
    .use(initReactI18next)
    .init({
      resources: locales,
      lng: 'en',
    });

  store.dispatch(initializeChannels(gon));
  store.dispatch(initializeMessages(gon));

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
