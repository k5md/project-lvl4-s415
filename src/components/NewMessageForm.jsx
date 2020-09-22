import React, { useCallback, useContext } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import * as Yup from 'yup';
import { uniqueId } from 'lodash';
import { UserContext } from '../UserContext';
import { useChannels } from '../hooks';
import { createNotification } from '../slices/notifications';
import api from '../api';

const NewMessageSchema = Yup.object().shape({
  message: Yup.string().required(i18n.t('errors.messages.emptyBody')),
});

export default () => {
  const { t } = useTranslation();
  const { currentChannelId } = useChannels();
  const { name } = useContext(UserContext);

  const dispatch = useDispatch();

  const addHandler = useCallback(async (values, { resetForm }) => {
    const message = { body: values.message, channelId: currentChannelId, author: name };
    try {
      await api.createMessage(message);
      resetForm();
    } catch (error) {
      const notification = { id: uniqueId(), type: 'error', message: error.message };
      dispatch(createNotification(notification));
    }
  }, [name, currentChannelId]);

  return (
    <Formik
      initialValues={{ message: '' }}
      validationSchema={NewMessageSchema}
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
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder={t('messages.placeholder')}
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <span>{t('messages.send')}</span>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};
