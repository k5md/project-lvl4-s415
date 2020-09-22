import React from 'react';
import ChannelControls from './ChannelControls';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

export default () => (
  <div className="h-100 d-flex flex-column">
    <div className="mb-3">
      <ChannelControls />
    </div>
    <div className="mb-3 overflow-auto">
      <Messages />
    </div>
    <div className="mt-auto">
      <NewMessageForm />
    </div>
  </div>
);
