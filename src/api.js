import axios from 'axios';
import routes from './routes';

export default {
  createChannel: ({ name }) => {
    const requestData = { data: { attributes: { name } } };
    const url = routes.channelsPath();
    return axios.post(url, requestData);
  },
  removeChannel: ({ id }) => {
    const url = routes.channelPath(id);
    return axios.delete(url);
  },
  renameChannel: ({ id, name }) => {
    const requestData = { data: { attributes: { name } } };
    const url = routes.channelPath(id);
    return axios.patch(url, requestData);
  },
  createMessage: ({ channelId, body, author }) => {
    const requestData = { data: { attributes: { author, body } } };
    const url = routes.channelMessagesPath(channelId);
    return axios.post(url, requestData);
  },
  newMessageSocket: ({ data: { attributes } }) => attributes,
  newChannelSocket: ({ data: { attributes } }) => attributes,
  removeChannelSocket: ({ data }) => data,
  renameChannelSocket: ({ data: { attributes } }) => attributes,
};
