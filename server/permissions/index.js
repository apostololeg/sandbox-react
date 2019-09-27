import { authenticated, validateRole } from '../middlewares';
import ROLES from './roles';

export default {
  'Query.me': [authenticated],
  'Mutation.createPost': [authenticated, validateRole(ROLES.EDITOR)],
  'Mutation.updatePost': [authenticated, validateRole(ROLES.EDITOR)],
  'Mutation.deletePost': [authenticated, validateRole(ROLES.EDITOR)],
};
