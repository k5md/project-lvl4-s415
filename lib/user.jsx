import React from 'react';
import faker from 'faker';
import cookies from 'js-cookie';

const initializeUsername = () => {
  const username = cookies.get('username');
  if (username) {
    return username;
  }

  const fakeUsername = faker.internet.userName();
  cookies.set('username', fakeUsername);
  return fakeUsername;
};

const user = { name: initializeUsername() };

export const UserContext = React.createContext();
export const UserProvider = ({ children }) => (
  <UserContext.Provider value={user}>
    {children}
  </UserContext.Provider>
);
