import gql from 'graphql-tag';

const Author = 'id name email';
const Post = `
  id
  createdAt
  updatedAt
  published
  title
  slug
  content
  tags
  author { ${Author} }
`;

export const GET_POST = gql`
  query($where: PostWhereUniqueInput!) {
    getPostById(where: $where) { ${Post} }
  }
`;

export const GET_POSTS = gql`
  query($where: PostWhereInput!) {
    posts(where: $where) { ${Post} }
  }
`;

export const CREATE_POST = gql`
  mutation($data: PostCreateInput!) {
    createPost(data: $data) { ${Post} }
  }
`;

export const UPDATE_POST = gql`
  mutation($id: String!, $data: PostUpdateInput!) {
    updatePostById(id: $id, data: $data) { ${Post} }
  }
`;

export const DELETE_POST = gql`
  mutation($id: String!) {
    deletePostById(id: $id) { ${Post} }
  }
`;

export default {};
