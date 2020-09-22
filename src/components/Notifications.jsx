import React, { useCallback } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectNotifications } from '../selectors';
import { removeNotification } from '../slices/notifications';

export default () => {
  const { t } = useTranslation();
  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch();

  const removeHandler = (id) => () => dispatch(removeNotification(id));

  const renderNotification = useCallback(({ id, type, message }) => (
    <Toast
      key={id}
      onClose={removeHandler(id)}
      delay={5000}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto text-truncate">
          {t(type)}
          :
          &nbsp;
        </strong>
        <div className="text-truncate">{t(message)}</div>
      </Toast.Header>
    </Toast>
  ), []);

  return (
    <div className="mt-3 mr-3 notifications__container">
      {notifications.map(renderNotification)}
    </div>
  );
};
