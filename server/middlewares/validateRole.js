export default (...roles) => next => (root, args, context, info) => {
  const isAdmin = context.user.roles.includes('ADMIN');

  if (isAdmin || context.user.roles.some(role => roles.includes(role))) {
    return next(root, args, context, info);
  }

  throw new Error(`User has no role "${roles.join(' or ')}"!`);
};
