import { store } from 'react-easy-state';

import { mutate, query } from 'tools/request';

import {
  LOAD_QUERY,
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION
} from './query';

const User = store({
  name: '',
  email: '',
  roles: ['guest'],
  isLogged: false,
  inProgress: false
});

export default User;

const progressInterface = {
  getProgress: () => User.inProgress,
  setProgress: val => User.inProgress = val,
};

const setUser = data => Object.assign(
  User,
  data,
  {
    inProgress: false,
    isLogged: Boolean(data.email),
    isAdmin: data.roles.includes('ADMIN')
  }
);

export const login = async payload => {
  const data = await mutate(LOGIN_MUTATION, {
    ...progressInterface,
    variables: payload,
    dataAccessor: 'login'
  });

  setUser(data);
};

export const register = async payload => {
  const data = await mutate(REGISTER_MUTATION, {
    ...progressInterface,
    variables: payload,
    dataAccessor: 'register'
  });

  setUser(data);
};

export const logout = async () => {
  await mutate(LOGOUT_MUTATION);

  setUser({ name: '', email: '', roles: ['guest'] });
};

(async function init() {
  try {
    const data = await query(LOAD_QUERY, { dataAccessor: 'me' });
    setUser(data);
  } catch(e) {
    console.warn(e.message);
  }
})();

