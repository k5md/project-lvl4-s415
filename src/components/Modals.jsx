import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectModals } from '../selectors';
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
  const name = useSelector(selectModals);
  const Modal = modals[name];

  const closeHandler = useCallback(() => {
    dispatch(closeModal());
  }, []);

  return Modal ? (<Modal onClose={closeHandler} />) : null;
};
