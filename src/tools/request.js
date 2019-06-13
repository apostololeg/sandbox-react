import client from 'apollo/client';

const gag = () => {};
const request = async ({
  getProgress = () => false,
  setProgress = gag,
  method,
  dataAccessor,
  onSuccess,
  onError = gag,
  ...params
}) => {
  if (getProgress()) {
    console.warn('✋ Request in progress');
    return;
  }

  setProgress(true);

  try {
    const res = await client[method](params);
    const { data, errors } = dataAccessor ? res.data[dataAccessor] : res.data;

    if (errors) {
      setProgress(false);
      errors.forEach(onError);
      return;
    }

    onSuccess(data);
    return true; // eslint-disable-line
  } catch (error) {
    setProgress(false);
    onError(error.message);
  }
};

export const query = (gql, params) => request({
  ...params,
  method: 'query',
  query: gql
});
export const mutate = (gql, params) => request({
  ...params,
  method: 'mutate',
  mutation: gql
});

export default {};
