import faker from 'faker';
import cookies from 'js-cookie';

export default () => {
  const name = cookies.get('username') || faker.internet.userName();
  cookies.set('username', name);
  return { name };
};
