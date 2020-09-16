import React, { useCallback } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMessagesList, useChannels, useUser } from '../hooks';
import { createMessage } from '../slices/messages';

export default () => {
  const { t } = useTranslation();

  const { currentChannelId } = useChannels();
  const messagesList = useMessagesList(currentChannelId);
  const { name } = useUser();

  const dispatch = useDispatch();

  const submitMessage = useCallback(async (values, { resetForm }) => {
    const message = { body: values.message, channelId: currentChannelId, author: name };
    await dispatch(createMessage(message));
    resetForm();
  }, []);

  const renderMessage = useCallback(({ id, author, body }) => (
    <div key={id}>
      <b>
        {author}
        :&nbsp;
      </b>
      {body}
    </div>
  ), []);

  const validateNewMessage = useCallback(({ message }) => {
    const errors = {};
    if (message.length === 0) {
      errors.message = 'Empty message';
    }
    return errors;
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex mb-3 align-items-center justify-content-end">
        <Button variant="link" className="shadow-none">{t('channels.rename')}</Button>
        <Button variant="link" className="shadow-none">{t('channels.remove')}</Button>
      </div>

      <div className="overflow-auto mb-3">
        {messagesList.map(renderMessage)}
      </div>

      <div className="mt-auto">
        <Formik
          initialValues={{ message: '' }}
          validate={validateNewMessage}
          onSubmit={submitMessage}
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
      </div>
    </div>
  );
};
