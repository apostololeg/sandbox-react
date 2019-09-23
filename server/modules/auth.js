import jwt from 'jsonwebtoken'
import gql from 'graphql-tag'
import { GraphQLModule } from '@graphql-modules/core'
import {
  PRODUCTION,
  JWT_SECRET,
  SESSION_EXPIRED_AFTER,
  ADMIN_SECRET
} from '../../config/const'
import schema from '../prisma/schema'

const COOKIE_TOKEN_NAME = 'x-token';
const COOKIE_OPTS = {
  httpOnly: true,
  secure: PRODUCTION
};

const getToken = id => jwt.sign(
  { id },
  JWT_SECRET,
  { expiresIn: SESSION_EXPIRED_AFTER }
);
const setCookie = (res, token) => {
  res.cookie(COOKIE_TOKEN_NAME, token, COOKIE_OPTS);
}
const clearCookie = res => {
  res.clearCookie(COOKIE_TOKEN_NAME, COOKIE_OPTS);
}

export default new GraphQLModule({
  name: 'auth',
  typeDefs: gql`
    ${schema}

    type Query {
      me: User
    }

    type Mutation {
      init(key: String!): User
      register(email: String!, password: String!): User
      login(email: String!, password: String!): User
      logout: String
    }
  `,
  resolvers: {
    Query: {
      me: (root, args, { user }) => user,
    },
    Mutation: {
      async init(_, { key }, { db, user }) {
        if (!user || key !== ADMIN_SECRET || user.roles.includes('ADMIN')) {
          return user;
        }

        const data = await db.updateUser({
          data: {
            roles: {
              set: [...user.roles, 'ADMIN']
            }
          },
          where: { id: user.id }
        });

        return data;
      },

      async register(_, { email, password }, { res, db }) {
        const existedUser = await db.user({ email });

        if (existedUser) {
          throw new Error('Email already in use');
        }

        const user = await db.createUser({
          email,
          password, // TODO: protect password
          roles: {
            set: ['USER']
          }
        });

        setCookie(res, getToken(user.id));
        return user;
      },

      async login(_, { email, password }, { db, res }) {
        const user = await db.user({ email });

        if (Object(user).password !== password) {
          throw new Error('Invalid credentials');
        }

        setCookie(res, getToken(user.id));
        return user;
      },

      logout(_, params, { res }) {
        clearCookie(res);
        return 'Bye!';
      }
    },
    User: {
      email: ({ email }) => email,
      roles: ({ roles }) => roles,
    },
  },
  context: ({ res, user, db }) => ({ res, user, db }),
});
