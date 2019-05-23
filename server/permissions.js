import { authenticated, validateRole } from './middlewares';

export default {
  'Query.me': [authenticated],
  'Mutation.publishArticle': [authenticated, validateRole('editor')],
};
