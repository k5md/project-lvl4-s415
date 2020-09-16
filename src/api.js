import axios from 'axios';
import routes from './routes';

export default {
  createChannel: ({ name }) => {
    const requestData = { data: { attributes: { name } } };
    const request = { method: 'POST', url: routes.channelsPath(), data: requestData };
    return axios(request);
  },
  removeChannel: ({ id }) => {
    const request = { method: 'DELETE', url: routes.channelPath(id) };
    return axios(request);
  },
  renameChannel: ({ id, name }) => {
    const requestData = { data: { attributes: { name } } };
    const request = { method: 'PATCH', url: routes.channelPath(id), data: requestData };
    return axios(request);
  },
  createMessage: ({ channelId, body, author }) => {
    const requestData = { data: { attributes: { author, body } } };
    const request = { method: 'POST', url: routes.channelMessagesPath(channelId), data: requestData };
    return axios(request);
  },
  newMessageSocket: ({ data: { attributes } }) => attributes,
  newChannelSocket: ({ data: { attributes } }) => attributes,
  removeChannelSocket: ({ data }) => data,
  renameChannelSocket: ({ data: { attributes } }) => attributes,
};
