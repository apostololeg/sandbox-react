import React, { Component } from 'react'
import { store, view } from 'react-easy-state'
import { bind } from 'decko'

import LS from 'tools/localStorage'

import UserStore from 'store/user'
import { notify } from 'store/notifications';
import { getPost, createPost, updatePost } from 'store/post'

import FullPage from 'components/UI/FullPage'
import Button from 'components/UI/Button'
import Input from 'components/UI/Input'

import Editor from 'components/Editor'

function connectAuthor(email) {
  return { connect: { email } };
}

function titleToSlug(str) {
  const explicitSymbols = ['&nbsp;'];

  if (!str) {
    return '';
  }

  return str
    .replace(new RegExp(`(${explicitSymbols.join('|')})`), '')
    .match(/[\w\d_.-]+/g).join('_')
    .toLowerCase();
}

class PostEditor extends Component {
  store = store({
    localVersion: LS.get('editor-post'),
    post: {
      author: null,
      slug: '',
      title: '',
      content: '',
      tags: [],
      published: false,
    },
    saving: false
  });

  async componentDidMount() {
    const { postId } = this.props;

    if (postId) {
      this.loadPost({ id: postId });
    } else {
      await this.createNewPost();
    }
  }

  async loadPost(where) {
    const data = await getPost(where);

    this.setPostData(data);
  }

  setPostData(data) {
    this.store.post = data;
    this.editor.setValue(data.content);
  }

  @bind
  async createNewPost() {
    const { navigate } = this.props;
    const { post } = this.store;

    if (!post.author) {
      post.author = connectAuthor(UserStore.email);
    }

    this.store.inProgress = true;

    try {
      const data = await createPost(post);
      this.setPostData(data)
      this.store.inProgress = false;
      navigate(`../edit/${data.id}`, { replace: true });
    } catch(e) {
      this.store.inProgress = false;
      notify({
        type: 'error',
        title: 'Create post failed',
        content: e.message
      });
    }
  }

  @bind
  onEditorApi(api) {
    this.editor = api;
  }

  @bind
  onEditorChange(value) {
    const title = Object(value.match('<h1.*>(.*)</h1>'))[1];
    const { post } = this.store;

    Object.assign(post, {
      title,
      slug: titleToSlug(title),
      content: value,
      lastUpdated: Date.now()
    });

    LS.set('editor-post', post);
  }

  @bind
  onSlugChange(e) {
    this.store.post.slug = titleToSlug(e.target.value);
  }

  @bind
  async onSave() {
    const { id, author, ...data } = this.store.post;

    if (author) {
      data.author = connectAuthor(author);
    }

    this.store.saving = true;
    const post = await updatePost({ id, data });

    this.store.saving = false;
    this.setPostData(post);

    notify({
      type: 'success',
      title: 'Post updated',
      // modal: true
    });
  }

  render() {
    const { post, saving } = this.store;
    const { slug } = post;

    return (
      <FullPage>
        <Input placeholder="slug" value={slug} onChange={this.onSlugChange} />
        <Editor
          onChange={this.onEditorChange}
          onApi={this.onEditorApi}
        />
        <Button onClick={this.onSave} loading={saving}>Save</Button>
      </FullPage>
    );
  }
}

export default view(PostEditor);
