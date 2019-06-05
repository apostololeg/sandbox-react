import { store } from 'react-easy-state';
import client from 'apollo/client';
import { REGISTER_MUTATION, LOGIN_MUTATION, LOAD_QUERY } from './query';

const User = store({
  name: '',
  email: '',
  roles: ['guest'],
  isLogged: false,
  inProgress: false
});

export default User;

export const login = async payload => {
  if (User.inProgress) {
    console.warn('✋ Request in progress');
    return;
  }

  User.inProgress = true;

  try {
    const res = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: payload
    });
    const { data, message } = res.data.login;

    Object.assign(User, data.login, {
      inProgress: false,
      isLogged: true,
    });
  } catch (error) {
    User.inProgress = false;
    throw error;
  }
};

export const register = async payload => {
  if (User.inProgress) {
    console.warn('✋ Request in progress');
    return;
  }

  User.inProgress = true;

  try {
    const res = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: payload
    });
    const { data, message } = res.data.register;

    Object.assign(User, data, {
      inProgress: false,
      isLogged: true,
    });
  } catch (error) {
    User.inProgress = false;
    throw error;
  }
};

// init
(async () => {
  User.inProgress = true;

  try {
    const { data } = await client.query({ query: LOAD_QUERY });

    Object.assign(User, data.me, { inProgress: false });
  } catch(e) {
    User.inProgress = false;
  }
})();

