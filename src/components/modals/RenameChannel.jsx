import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannelRequest } from '../../slices/channels';
import { selectChannels } from '../../selectors';

export default ({ onClose }) => {
  const { t } = useTranslation();
  const { channelsList, currentChannelId } = useSelector(selectChannels);
  const currentChannel = channelsList.find(({ id }) => id === currentChannelId);

  const dispatch = useDispatch();

  const renameHandler = useCallback(async (values, { resetForm }) => {
    const channel = { name: values.name, id: currentChannelId };
    await dispatch(renameChannelRequest(channel));
    resetForm();
    onClose();
  }, []);

  const validateChannel = useCallback(({ name }) => {
    const errors = {};
    if (name.length === 0) {
      errors.name = t('errors.channels.emptyName');
    }
    return errors;
  }, []);

  return (
    <Modal size="sm" centered show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.renameChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: currentChannel.name }}
        validate={validateChannel}
        onSubmit={renameHandler}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <InputGroup as={Modal.Body} className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>{t('modals.renameChannel.name')}</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </InputGroup>
            <Modal.Footer>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <span>{t('modals.renameChannel.submit')}</span>
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
