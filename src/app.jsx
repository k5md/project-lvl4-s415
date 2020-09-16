import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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

export default (container, gon) => {
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
  socket.on('connect', () => store.dispatch(createNotification({ type: 'Note', message: 'Connected' })));
  socket.on('newMessage', ({ data: { attributes } }) => store.dispatch(createMessage(attributes)));
  socket.on('newChannel', ({ data: { attributes } }) => store.dispatch(createChannel(attributes)));
  socket.on('removeChannel', ({ data }) => store.dispatch(removeChannel(data)));
  socket.on('renameChannel', ({ data: { attributes } }) => store.dispatch(renameChannel(attributes)));

  ReactDOM.render(
    <Provider store={store}>
      <UserProvider value={user}>
        <Chat />
      </UserProvider>
    </Provider>, container,
  );
};
