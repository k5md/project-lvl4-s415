import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../slices/channels';

export default ({ onClose }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const submitChannel = useCallback(async (values, { resetForm }) => {
    const channel = { name: values.name };
    await dispatch(createChannel(channel));
    resetForm();
  }, []);

  const validateNewChannel = useCallback(({ name }) => {
    const errors = {};
    if (name.length === 0) {
      errors.name = 'Empty channel name';
    }
    return errors;
  }, []);

  return (
    <Modal size="sm" centered show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.addChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        validate={validateNewChannel}
        onSubmit={submitChannel}
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
                <InputGroup.Text>{t('modals.addChannel.name')}</InputGroup.Text>
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
                <span>{t('modals.addChannel.submit')}</span>
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
