import React, { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import i18n from 'i18next';
import { createChannelRequest } from '../../slices/channels';

const NewChannelSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t('errors.channels.emptyName')),
});

export default ({ onClose }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const addHandler = useCallback(async (values, { resetForm }) => {
    const channel = { name: values.name };
    await dispatch(createChannelRequest(channel));
    resetForm();
    onClose();
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
        validationSchema={NewChannelSchema}
        onSubmit={addHandler}
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
