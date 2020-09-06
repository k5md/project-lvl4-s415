import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { initialize } from './slices/channels';
import Chat from './components/Chat';

export default (container, gon) => {
  store.dispatch(initialize(gon));

  ReactDOM.render(
    <Provider store={store}>
      <Chat />
    </Provider>, container,
  );
};
