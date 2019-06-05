import gql from 'graphql-tag';
import { GraphQLModule } from '@graphql-modules/core';
import pick from 'lodash.pick';
import jwt from 'jsonwebtoken';

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
      username: String!
      roles: [String!]!
    }

    type AuthResponse {
      data: User
      token: String
      message: String
    }

    type Query {
      me: User
    }

    type Mutation {
      register(username: String!, email: String!, password: String!): AuthResponse
      login(email: String!, password: String!): AuthResponse
    }
  `,
  resolvers: {
    Query: {
      me: (root, args, { user }) => user,
    },
    Mutation: {
      async register(root, { username, email, password }, { res, db }) {
        const existedUser = await db.user({ email });

        if (existedUser) {
          return { message: 'Email already in use' };
        }

        const user = await db.createUser({
          username,
          email,
          password, // TODO: protect password
          roles: ['user']
        });

        setCookie(res, getToken(user.id));

        return {
          user: pick(user, ['username', 'email', 'roles'])
        };
      },
      async login(root, { email, password }, { db, res }) {
        const user = await db.user({ email, password });

        if (!user || user.password !== password) {
          return { message: 'Invalid credentials' };
        }

        setCookie(res, getToken(user.id));

        return { user };
      }
    },
    User: {
      id: user => user.id,
      username: user => user.username,
      roles: user => user.roles,
    },
  },
  async context({ req, res, db }) {
    const authToken = req.cookies[COOKIE_TOKEN_NAME];

    if (!authToken) {
      return { res };
    }

    try {
      const { id } = jwt.verify(authToken, JWT_SECRET);
      const user = await db.user({ id });

      return { user };
    } catch (e) {
      return null;
    }
  },
});
