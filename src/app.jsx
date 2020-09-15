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
import { add } from './slices/notifications';

export default (container, gon) => {
  store.dispatch(initializeChannels(gon));
  store.dispatch(initializeMessages(gon));

  const user = initializeUser();

  const socket = io();
  socket.on('connect', () => store.dispatch(add({ type: 'Note', message: 'Connected' })));
  socket.on('newMessage', ({ data: { attributes } }) => store.dispatch(addMessage(attributes)));

  ReactDOM.render(
    <Provider store={store}>
      <UserProvider value={user}>
        <Chat />
      </UserProvider>
    </Provider>, container,
  );
};
