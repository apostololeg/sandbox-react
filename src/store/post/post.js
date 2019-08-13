import { mutate, query } from 'tools/request';
import pick from 'lodash.pick';

import {
  GET_POST,
  GET_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST
} from './query';

const WRITABLE_FIELDS = [
  'author',
  'slug',
  'slugLock',
  'title',
  'content',
  'tags',
  'published'
];

export const getPost = where => query(GET_POST, {
  variables: { where },
  dataAccessor: 'getPostById'
});

export const getPosts = (where = {}) => query(GET_POSTS, {
  variables: { where },
  dataAccessor: 'posts'
});

export const createPost = data => mutate(CREATE_POST, {
  variables: {
    data: pick(data, WRITABLE_FIELDS)
  },
  dataAccessor: 'createPost'
});

export const updatePost = ({ id, data }) => mutate(UPDATE_POST, {
  variables: {
    id,
    data: pick(data, WRITABLE_FIELDS)
  },
  dataAccessor: 'updatePostById'
});

export const deletePost = id => mutate(DELETE_POST, {
  variables: { id },
  dataAccessor: 'deletePostById'
});
