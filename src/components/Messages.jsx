import React, { useCallback } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useMessagesList, useChannels, useUser } from '../hooks';
import { createMessage } from '../slices/messages';
import { open } from '../slices/modals';

export default () => {
  const { t } = useTranslation();

  const { currentChannelId, channelsList } = useChannels();
  const { removable, name: channelName } = channelsList.find(({ id }) => currentChannelId === id) || { name: '', removable: false };

  const messagesList = useMessagesList(currentChannelId);
  const { name } = useUser();

  const dispatch = useDispatch();

  const submitMessage = useCallback(async (values, { resetForm }) => {
    const message = { body: values.message, channelId: currentChannelId, author: name };
    await dispatch(createMessage(message));
    resetForm();
  }, [name, currentChannelId]);

  const renderMessage = useCallback(({ id, author, body }) => (
    <div className="text-wrap text-break" key={id}>
      <p>
        <strong>
          {author}
          :&nbsp;
        </strong>
        {body}
      </p>
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
      <div className="d-flex mb-3 align-items-center justify-content-end">
        <div className="text-truncate mr-auto">{channelName}</div>
        <Button variant="link" className={cn({ 'shadow-none': true, invisible: !removable })} onClick={showRenameChannel}>{t('channels.rename')}</Button>
        <Button variant="link" className={cn({ 'shadow-none': true, invisible: !removable })} onClick={showRemoveChannel}>{t('channels.remove')}</Button>
      </div>

      <div className="mb-3 scrollable">
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
