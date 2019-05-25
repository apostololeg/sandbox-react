import store from 'store';

export const initUser = () => async dispatch => {
  const { isLogged } = !store.getState().user;
  // const

  // if ()
}

export const login = () => async dispatch => {
  if (fetching) {
    return;
  }

  const teardown = () => {
    fetching = false;
    dispatch(setTagsLoading(false));
  };

  fetching = true;
  dispatch(setTagsLoading(true));

  try {
    const res = await ApolloClient.query({
      query: QUERY,
      fetchPolicy: 'network-only',
    });

    teardown();
    dispatch(setTags(res.data.tagsList));
  } catch (error) {
    teardown();
    throw error;
  }
};
