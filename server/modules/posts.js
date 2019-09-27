import gql from 'graphql-tag'
import { GraphQLModule } from '@graphql-modules/core'

import schema from '../prisma/schema'
import validateRole from '../permissions/validateRole';
import ROLES from '../permissions/roles';

export default new GraphQLModule({
  name: 'posts',
  typeDefs: gql`
    ${schema}

    type Query {
      getPost(where: PostWhereUniqueInput!): Post
      getPosts(where: PostWhereInput!): [Post]!
    }

    type Mutation {
      createPost(data: PostCreateInput!): Post!
      updatePostById(id: String!, data: PostUpdateInput!): Post!
      deletePostById(id: String!): Post!
    }
  `,
  resolvers: {
    Query: {
      getPost: async (root, { where }, { db, user }) => {
        if (!validateRole(user, ROLES.EDITOR)) {
          where.published = true;
        }

        const posts = await db.posts({ where });

        return posts[0];
      },
      getPosts: (root, { where }, { db, user }) => {
        if (!validateRole(user, ROLES.EDITOR)) {
          where.published = true;
        }

        return db.posts({ where });
      }
    },
    Mutation: {
      createPost: (_, { data }, { db }) => db.createPost(data),
      updatePostById: (_, { id, data }, { db }) => db.updatePost({
        data,
        where: { id }
      }),
      deletePostById: (_, { id }, { db }) => db.deletePost({ id })
    },
  },
  context: ({ res, user, db }) => ({ res, user, db }),
});
