import client from 'apollo/client';

const gag = () => false;

async function request({
  getProgress = gag,
  setProgress = gag,
  method,
  dataAccessor,
  ...params
}) {
  if (getProgress()) {
    console.warn('✋ Request in progress');
    return;
  }

  setProgress(true);

  try {
    const res = await client[method](params);
    const data = dataAccessor ? res.data[dataAccessor] : res.data;

    setProgress(false);
    return data; // eslint-disable-line
  } catch (error) {
    setProgress(false);
    throw error;
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
