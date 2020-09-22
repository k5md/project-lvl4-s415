import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectMessagesList, selectChannels } from '../selectors';

export default () => {
  const { currentChannelId } = useSelector(selectChannels);
  const messagesList = useSelector(selectMessagesList(currentChannelId));

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

  return messagesList.map(renderMessage);
};
