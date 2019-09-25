import validateRole from '../permissions/validateRole';

export default (...roles) => next => (root, args, context, info) => {
  if (validateRole(context.user, ...roles) {
    return next(root, args, context, info);
  }

  throw new Error(`User has no role "${roles.join(' or ')}"!`);
};
