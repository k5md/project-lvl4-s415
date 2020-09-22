import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { removeChannelRequest } from '../../slices/channels';
import { selectChannels } from '../../selectors';

export default ({ onClose }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { currentChannelId } = useSelector(selectChannels);

  const removeHandler = useCallback(async () => {
    await dispatch(removeChannelRequest({ id: currentChannelId }));
    onClose();
  }, []);

  return (
    <Modal centered show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.removeChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{t('modals.removeChannel.content')}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          <span>{t('modals.removeChannel.cancel')}</span>
        </Button>
        <Button variant="danger" onClick={removeHandler}>
          <span>{t('modals.removeChannel.confirm')}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
