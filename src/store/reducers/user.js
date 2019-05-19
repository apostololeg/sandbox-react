const initialState = {
  name: '',
  email: '',
  role: ['guest'],
  isLogged: false,
};

export default (state = initialState, { type, ...action }) => {
  if (type === 'LOGIN') {
    return { ...state, ...action.data };
  }

  if (type === 'SET_CATEGORIES') {
    const { items, count } = data;

    return {
      ...state,
      count,
      items: items.filter(cat => cat.children.length > 0),
      updated: new Date(),
    };
  }

  return state;
};
