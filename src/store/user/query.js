import gql from 'graphql-tag';

export const LOAD_QUERY = gql`
  query {
    me {
      id
      email
      username
      roles
    }
  }
`
export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      data {
        id
        email
        username
        roles
      }
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      message
      data {
        id
        email
        username
        roles
      }
    }
  }
`

export default {};
