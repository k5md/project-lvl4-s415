import React, { useCallback } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useMessagesList, useChannels, useUser } from '../hooks';
import { sendMessage } from '../slices/messages';

export default () => {
  const { currentChannelId } = useChannels();
  const messagesList = useMessagesList(currentChannelId);
  const { name } = useUser();

  const dispatch = useDispatch();

  const submitMessage = useCallback(async (values, { resetForm }) => {
    const message = { body: values.message, channelId: currentChannelId, author: name };
    await dispatch(sendMessage(message));
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
                  placeholder="Your message..."
                  name="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                />
                <InputGroup.Append>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    <span>Send</span>
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
