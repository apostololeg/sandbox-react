export default role => next => (root, args, context, info) => {
  if (context.currentUser.roles.includes(role)) {
    throw new Error(`User has no role "${role}"!`);
  }

  return next(root, args, context, info);
};
