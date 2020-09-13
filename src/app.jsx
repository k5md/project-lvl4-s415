import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { initialize as initializeChannels } from './slices/channels';
import { initialize as initializeMessages } from './slices/messages';
import Chat from './components/Chat';
import { UserProvider } from '../lib/user';

export default (container, gon) => {
  store.dispatch(initializeChannels(gon));
  store.dispatch(initializeMessages(gon));

  ReactDOM.render(
    <Provider store={store}>
      <UserProvider>
        <Chat />
      </UserProvider>
    </Provider>, container,
  );
};
