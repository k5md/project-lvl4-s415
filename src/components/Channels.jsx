import React, { useCallback } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useChannels } from '../hooks';
import { open } from '../slices/modals';
import { setCurrent } from '../slices/channels';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { channelsList, currentChannelId } = useChannels();

  const activateChannel = (id) => () => {
    dispatch(setCurrent({ id }));
  };

  const renderChannel = ({ id, name }) => (
    <Nav.Item key={id}>
      <Nav.Link active={id === currentChannelId} className="text-truncate" onClick={activateChannel(id)}>{name}</Nav.Link>
    </Nav.Item>
  );

  const showAddChannel = useCallback(() => {
    dispatch((open('addChannel')));
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex mb-3 align-items-center justify-content-between">
        <span>{t('channels.title')}</span>
        <Button variant="link" className="shadow-none" onClick={showAddChannel}>+</Button>
      </div>
      <Nav variant="pills" className="d-flex flex-column flex-nowrap scrollable">
        {channelsList.map(renderChannel)}
      </Nav>
    </div>
  );
};
