const initialState = {
  name: '',
  email: '',
  roles: ['guest'],
  isLogged: false,
  inProgress: false
};

export default (state = initialState, { type, ...action }) => {
  if (type === 'SET_USER_LOADING') {
    const { loading } = action;

    return { ...state, loading };
  }

  if (type === 'SET_USER') {
    return {
      ...state,
      ...action.data,
      inProgress: false
    };
  }

  return state;
};
