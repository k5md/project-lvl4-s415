import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useChannels } from '../hooks';
import { openModal } from '../slices/modals';

export default () => {
  const { t } = useTranslation();

  const { currentChannelId, channelsList } = useChannels();
  const { removable, name: channelName } = channelsList.find(({ id }) => currentChannelId === id) || { name: '', removable: false };

  const dispatch = useDispatch();
  const removeHandler = useCallback(() => dispatch((openModal('removeChannel'))), []);
  const renameHandler = useCallback(() => dispatch((openModal('renameChannel'))), []);

  return (
    <div className="d-flex align-items-center justify-content-end">
      <div className="text-truncate mr-auto">{channelName}</div>
      <Button
        variant="link"
        className={cn({ 'shadow-none': true, invisible: !removable })}
        onClick={renameHandler}
      >
        {t('channels.rename')}
      </Button>
      <Button
        variant="link"
        className={cn({ 'shadow-none': true, invisible: !removable })}
        onClick={removeHandler}
      >
        {t('channels.remove')}
      </Button>
    </div>
  );
};
