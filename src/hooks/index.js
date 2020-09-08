/* eslint-disable import/prefer-default-export */

import { useSelector } from 'react-redux';

export const useChannels = () => useSelector(({ channels }) => channels);
