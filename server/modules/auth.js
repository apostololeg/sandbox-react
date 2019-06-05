import gql from 'graphql-tag';
import { GraphQLModule } from '@graphql-modules/core';
import jwt from 'jsonwebtoken';

const pick = require('lodash.pick');

require('dotenv').config();

const { JWT_SECRET } = process.env;
const COOKIE_TOKEN_NAME = 'x-token';

const getToken = id => jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
const setCookie = (res, token) => {
  res.cookie(COOKIE_TOKEN_NAME, token, {
    httpOnly: true,
    secure: true
  });
}

export default new GraphQLModule({
  name: 'auth',
  typeDefs: gql`
    type User {
      id: ID!
      email: String!
      roles: [String!]!
    }

    type AuthResponse {
      data: User
      message: String
    }

    type Query {
      me: User
    }

    type Mutation {
      register(email: String!, password: String!): AuthResponse
      login(email: String!, password: String!): AuthResponse
    }
  `,
  resolvers: {
    Query: {
      me: (root, args, { user }) => user,
    },
    Mutation: {
      async register(root, { email, password }, { res, db }) {
        debugger
        const existedUser = await db.user({ email });

        debugger
        if (existedUser) {
          return { message: 'Email already in use' };
        }

        const user = await db.createUser({
          email,
          password, // TODO: protect password
          roles: {
            set: ['USER']
          }
        });

        debugger
        setCookie(res, getToken(user.id));

        return {
          data: pick(user, ['username', 'email', 'roles'])
        };
      },
      async login(root, { email, password }, { db, res }) {
        const user = await db.user({ email, password });

        if (!user || user.password !== password) {
          return { message: 'Invalid credentials' };
        }

        setCookie(res, getToken(user.id));

        return { data: user };
      }
    },
    AuthResponse: {
      data: ({ data }) => data,
      message: ({ message }) => message,
    },
    User: {
      username: user => user.username,
      roles: user => user.roles,
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
