import React, { useCallback } from 'react';
import { useMessagesList, useChannels } from '../hooks';

export default () => {
  const { currentChannelId } = useChannels();
  const messagesList = useMessagesList(currentChannelId);

  const renderMessage = useCallback(({ id, author, body }) => (
    <div className="text-wrap text-break" key={id}>
      <p>
        <strong>
          {author}
          :&nbsp;
        </strong>
        {body}
      </p>
    </div>
  ), []);

  return messagesList.filter(({ channelId }) => currentChannelId === channelId).map(renderMessage);
};
