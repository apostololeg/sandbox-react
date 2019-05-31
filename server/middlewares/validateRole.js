export default role => next => (root, args, context, info) => {
  if (context.currentUser.roles.includes(role)) {
    throw new Error(`Unauthorized!`);
  }

  return next(root, args, context, info);
};
