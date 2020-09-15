import React, { useCallback } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useChannels } from '../hooks';

export default () => {
  const { t } = useTranslation();
  const { channelsList, currentChannelId } = useChannels();

  const renderChannel = useCallback(({ id, name }) => (
    <Nav.Item key={id}>
      <Nav.Link active={id === currentChannelId}>{name}</Nav.Link>
    </Nav.Item>
  ), []);

  return (
    <>
      <div className="d-flex mb-3 align-items-center justify-content-between">
        <span>{t('channels.title')}</span>
        <Button variant="link" className="shadow-none">+</Button>
      </div>
      <Nav variant="pills" className="flex-column">
        {channelsList.map(renderChannel)}
      </Nav>
    </>
  );
};
