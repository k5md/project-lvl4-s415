import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useModals } from '../hooks';
import AddChannel from './modals/AddChannel';
import RemoveChannel from './modals/RemoveChannel';
import RenameChannel from './modals/RenameChannel';
import { closeModal } from '../slices/modals';

const modals = {
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

export default () => {
  const dispatch = useDispatch();
  const name = useModals();
  const Modal = modals[name];

  const closeHandler = useCallback(() => {
    dispatch(closeModal());
  }, []);

  return Modal ? (<Modal onClose={closeHandler} />) : null;
};
