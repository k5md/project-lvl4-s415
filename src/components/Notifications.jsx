import React, { useCallback } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useDispatch } from 'react-redux';
import { useNotifications } from '../hooks';
import { remove } from '../slices/notifications';

export default () => {
  const notifications = useNotifications();

  const dispatch = useDispatch();

  const removeNotification = (id) => () => dispatch(remove(id));

  const renderNotification = useCallback(({ id, type, message }) => (
    <Toast
      key={id}
      onClose={removeNotification(id)}
      delay={5000}
      autohide
      className="mw-100 w-100 border-0 notifications__toast"
    >
      <Toast.Header className="border-0">
        <strong className="mr-auto text-truncate">
          {type}
          :
        </strong>
        <div className="text-truncate">{message}</div>
      </Toast.Header>
    </Toast>
  ), []);

  return (
    <div className="mt-3 notifications__container">
      {notifications.map(renderNotification)}
    </div>
  );
};
