import jwt from 'jsonwebtoken'
import gql from 'graphql-tag'
import { GraphQLModule } from '@graphql-modules/core'
import { JWT_SECRET } from '../../config/const'
import schema from '../prisma/schema'

const COOKIE_TOKEN_NAME = 'x-token';
const COOKIE_OPTS = {
  httpOnly: true,
  // secure: true // NOTE: enable only when run on https (has ssl sertificate)
};

const getToken = id => jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
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
