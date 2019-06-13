import gql from 'graphql-tag';
import { GraphQLModule } from '@graphql-modules/core';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const { JWT_SECRET } = process.env;
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
    type User {
      email: String!
      roles: [String!]!
    }

    type AuthResponse {
      data: User
      message: String
      errors: [String!]
    }

    type Query {
      me: AuthResponse
    }

    type Mutation {
      register(email: String!, password: String!): AuthResponse
      login(email: String!, password: String!): AuthResponse
      logout: AuthResponse
    }
  `,
  resolvers: {
    Query: {
      me: (root, args, { user }) => ({ data: user }),
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

        return { data: user };
      },
      async login(_, { email, password }, { db, res }) {
        const user = await db.user({ email });

        if (!user || user.password !== password) {
          return { errors: ['Invalid credentials'] };
        }

        setCookie(res, getToken(user.id));

        return { data: user };
      },
      logout(_, params, { res }) {
        clearCookie(res);
        return { message: 'Bye!' };
      }
    },
    AuthResponse: {
      data: ({ data }) => data,
      errors: ({ errors }) => errors,
      message: ({ message }) => message,
    },
    User: {
      email: ({ email }) => email,
      roles: ({ roles }) => roles,
    },
  },
  async context({ req, res, db }) {
    const defaultCtx = { res, db };
    const authToken = req.cookies[COOKIE_TOKEN_NAME];

    if (!authToken) {
      return defaultCtx;
    }

    try {
      const { id } = jwt.verify(authToken, JWT_SECRET);
      const user = await db.user({ id });

      return { ...defaultCtx, user };
    } catch (e) {
      return defaultCtx;
    }
  },
});
