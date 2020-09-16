import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

export default ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal size="lg" centered show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.addChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

