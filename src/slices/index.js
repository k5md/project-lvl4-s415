import { combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages from './messages';
import notifications from './notifications';
import modals from './modals';

export default combineReducers({
  channels,
  messages,
  notifications,
  modals,
});
