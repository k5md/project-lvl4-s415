import { combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages from './messages';

export default combineReducers({
  channels,
  messages,
});
