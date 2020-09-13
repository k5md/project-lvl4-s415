import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { initialize as initializeChannels } from './slices/channels';
import { initialize as initializeMessages, addMessage } from './slices/messages';
import Chat from './components/Chat';
import { UserProvider } from '../lib/user';
import io from 'socket.io-client';

export default (container, gon) => {
  store.dispatch(initializeChannels(gon));
  store.dispatch(initializeMessages(gon));

  const socket = io();
  socket.on('newMessage', ({ data: { attributes } }) => store.dispatch(addMessage(attributes)));

  ReactDOM.render(
    <Provider store={store}>
      <UserProvider>
        <Chat />
      </UserProvider>
    </Provider>, container,
  );
};
