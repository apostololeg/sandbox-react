import store from 'store';
import client from 'apollo/client';

import { LOGIN_MUTATION, LOAD_QUERY } from './query';

const getStore = () => store.getState().user;

const setUserLoading = loading => ({
  type: 'SET_USER_LOADING',
  loading
});

const setUser = data => ({
  type: 'SET_USER',
  data
});

export const initUser = () => async dispatch => {
  const { isLogged } = getStore();

  if (isLogged) {
    return
  }

  try {
    const { data } = await client.query({ query: LOAD_QUERY });

    dispatch(setUser(data.me));
  } catch(error) {
    console.warn(error.message);
  }
}

export const login = payload => async dispatch => {
  const { inProgress } = getStore();

  if (inProgress) {
    console.warn('✋ Request in progress');
    return;
  }

  const teardown = () => {
    dispatch(setUserLoading(false));
  };

  dispatch(setUserLoading(true));

  try {
    const res = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: payload
    });
    const { data, message } = res.data.login;

    teardown();
    dispatch(setUser(data));
  } catch (error) {
    teardown();
    throw error;
  }
};
