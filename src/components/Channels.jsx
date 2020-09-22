import React, { useCallback } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useChannels } from '../hooks';
import { openModal } from '../slices/modals';
import { setCurrentChannel } from '../slices/channels';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { channelsList, currentChannelId } = useChannels();

  const activateHandler = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const renderChannel = ({ id, name }) => (
    <Nav.Item key={id}>
      <Nav.Link
        active={id === currentChannelId}
        className="text-truncate"
        onClick={activateHandler(id)}
      >
        {name}
      </Nav.Link>
    </Nav.Item>
  );

  const showAddChannel = useCallback(() => {
    dispatch((openModal('addChannel')));
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex mb-3 align-items-center justify-content-between">
        <span>{t('channels.title')}</span>
        <Button variant="link" className="shadow-none" onClick={showAddChannel}>+</Button>
      </div>
      <Nav variant="pills" className="d-flex flex-column flex-nowrap overflow-auto">
        {channelsList.map(renderChannel)}
      </Nav>
    </div>
  );
};
