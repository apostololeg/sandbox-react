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
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export default {};
