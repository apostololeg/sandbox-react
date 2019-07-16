import user from './user';

const ctxs = [
  user
];

export default async function({ req, res, db }) {
  const ctx = { req, res, db };

  await Promise.all(ctxs.map(async c => {
    const data = await c(ctx);
    Object.assign(ctx, data);
  }));

  return ctx;
};
