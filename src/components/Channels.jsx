import React, { useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useChannels } from '../hooks';

export default () => {
  const channels = useChannels();

  const renderChannel = useCallback(({ id, name }) => (
    <ListGroup.Item key={id}>{name}</ListGroup.Item>
  ), []);

  return (
    <>
      <div className="mb-3">Channels</div>
      <ListGroup>
        {channels.map(renderChannel)}
      </ListGroup>
    </>
  );
};
