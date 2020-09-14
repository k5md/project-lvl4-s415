import { combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages from './messages';
import notifications from './notifications';

export default combineReducers({
  channels,
  messages,
  notifications,
});
