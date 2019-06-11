import { store } from 'react-easy-state';

import { mutate, query } from 'tools/request';
import { notify } from 'store/notifications';

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
  mutate(LOGIN_MUTATION, {
    ...progressInterface,
    variables: payload,
    dataAccessor: 'login',
    onSuccess: data => setUser(data),
    onError: text => notify({ type: 'error', text })
  });
};

export const register = async payload => {
  mutate(REGISTER_MUTATION, {
    ...progressInterface,
    variables: payload,
    dataAccessor: 'register',
    onSuccess: data => setUser(data),
    onError: text => notify({ type: 'error', text })
  });
};

export const logout = async () => {
  mutate(LOGOUT_MUTATION, {
    onSuccess: () => setUser({ name: '', email: '', roles: ['guest'] }),
    onError: err => throw err
  });
}

// init
query(LOAD_QUERY, {
  dataAccessor: 'me',
  onSuccess: data => setUser(data),
});

