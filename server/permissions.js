import { authenticated, validateRole } from './middlewares';

export default {
  'Query.me': [authenticated],
  'Mutation.createPost': [authenticated, validateRole('editor')],
  'Mutation.updatePost': [authenticated, validateRole('editor')],
  'Mutation.deletePost': [authenticated, validateRole('editor')],
};
