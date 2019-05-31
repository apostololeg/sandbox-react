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

const loadUser = async dispatch => {
  try {
    const res = await client.query({ query: LOAD_QUERY });

    debugger
    dispatch(setUser(res.me));
  } catch(error) {
    throw error;
  }
}

export const initUser = () => async dispatch => {
  const { isLogged } = getStore();

  if (!isLogged) {
    await dispatch(loadUser());
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
    const { data, token, message } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: payload
    });

    teardown();
    dispatch(setUser(data));
  } catch (error) {
    teardown();
    throw error;
  }
};
