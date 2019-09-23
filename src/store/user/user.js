import { store } from 'preact-easy-state';

import { mutate, query } from 'tools/request';

import {
  LOAD_QUERY,
  INIT_MUTATION,
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

function initAdmin() {
  if (!User.roles.includes('ADMIN')) {
    window.makeAdmin = async key => {
      const res = await mutate(INIT_MUTATION, { variables: { key } });
      const { roles } = res.init;

      if (roles.includes('ADMIN')) {
        setUser({ ...User, roles }); // eslint-disable-line
        console.log('Welcome, admin!');
        delete window.makeAdmin;
      }
    };
  }
}

function setUser(data) {
  Object.assign(
    User,
    data,
    {
      inProgress: false,
      isLogged: Boolean(data.email),
      isAdmin: data.roles.includes('ADMIN')
    }
  );

  initAdmin();
}

export async function login(payload) {
  const data = await mutate(LOGIN_MUTATION, {
    ...progressInterface,
    variables: payload,
    dataAccessor: 'login'
  });

  setUser(data);
};

export async function register(payload) {
  const data = await mutate(REGISTER_MUTATION, {
    ...progressInterface,
    variables: payload,
    dataAccessor: 'register'
  });

  setUser(data);
};

export async function logout() {
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

