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
      token
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
