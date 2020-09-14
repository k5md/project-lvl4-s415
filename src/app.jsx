import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import store from './store';
import { initialize as initializeChannels } from './slices/channels';
import { initialize as initializeMessages, addMessage } from './slices/messages';
import Chat from './components/Chat';
import { UserProvider } from './components/UserContext';
import initializeUser from '../lib/user';

export default (container, gon) => {
  store.dispatch(initializeChannels(gon));
  store.dispatch(initializeMessages(gon));

  const user = initializeUser();

  const socket = io();
  socket.on('newMessage', ({ data: { attributes } }) => {
    const { author } = attributes;
    if (author === user.name) {
      return;
    }
    store.dispatch(addMessage(attributes));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserProvider value={user}>
        <Chat />
      </UserProvider>
    </Provider>, container,
  );
};
