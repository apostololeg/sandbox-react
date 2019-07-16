import gql from 'graphql-tag';

export const LOAD_QUERY = gql`
  query {
    me {
      email
      roles
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
      roles
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      roles
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export default {};
