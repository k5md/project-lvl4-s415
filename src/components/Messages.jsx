import React, { useCallback } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMessagesList, useChannels, useUser } from '../hooks';
import { createMessage } from '../slices/messages';
import { open } from '../slices/modals';

export default () => {
  const { t } = useTranslation();

  const { currentChannelId, channelsList } = useChannels();
  const channel = channelsList.find(({ id }) => currentChannelId === id);
  const removable = channel ? channel.removable : false;

  const messagesList = useMessagesList(currentChannelId);
  const { name } = useUser();

  const dispatch = useDispatch();

  const submitMessage = useCallback(async (values, { resetForm }) => {
    const message = { body: values.message, channelId: currentChannelId, author: name };
    await dispatch(createMessage(message));
    resetForm();
  }, [name, currentChannelId]);

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

  const showRemoveChannel = useCallback(() => {
    dispatch((open('removeChannel')));
  }, []);

  const showRenameChannel = useCallback(() => {
    dispatch((open('renameChannel')));
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      {removable && (
        <div className="d-flex mb-3 align-items-center justify-content-end">
          <Button variant="link" className="shadow-none" onClick={showRenameChannel}>{t('channels.rename')}</Button>
          <Button variant="link" className="shadow-none" onClick={showRemoveChannel}>{t('channels.remove')}</Button>
        </div>
      )}

      <div className="overflow-auto mb-3">
        {messagesList.filter(({ channelId }) => currentChannelId === channelId).map(renderMessage)}
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
