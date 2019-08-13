import React, { Fragment, Component } from 'react'
import { store, view } from 'react-easy-state'
import { bind, debounce } from 'decko'
import pick from 'lodash/pick'

import LS from 'tools/localStorage'

import UserStore from 'store/user'
import { notify } from 'store/notifications'
import { getPost, createPost, updatePost } from 'store/post'

import Form from 'components/UI/Form'
import { mix as flex } from 'components/UI/Flex'
import Checkbox from 'components/UI/Checkbox'
import Button from 'components/UI/Button'

import Editor from 'components/Editor'

import s from './PostEditor.styl';

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

function pickFormVals(vals) {
  return pick(vals, ['slug', 'slugLock', 'content', 'published'])
}

class PostEditor extends Component {
  store = store({
    localVersion: LS.get('editor-post'),
    post: {
      author: null,
      slug: '',
      slugLock: false,
      title: '',
      content: '',
      tags: [],
      published: false,
      updatedAt: ''
    },
    loading: false,
    saving: false,
  });

  async componentDidMount() {
    const { postId } = this.props;
    const { localVersion } = this.store;

    this.validationSchema = {
      slug: { type: 'string' },
      content: { type: 'string' }
    };

    if (postId) {
      this.store.loading = true;
      const post = await getPost({ id: postId });
      this.store.loading = false;

      this.setPostData(post);

      if (postId === Object(localVersion).id) {
        setTimeout(this.toggleLocalVersion, 0);
      }
    } else {
      await this.createNewPost();
    }
  }

  setPostData(data) {
    this.store.post = data;
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

  updatedLocalVersion(patch) {
    const { post, localVersion } = this.store;

    if (!localVersion) {
      this.store.localVersion = { ...post, ...patch };
    } else {
      Object.assign(localVersion, patch);
    }
  }

  @bind
  @debounce(600)
  onChange(values) { // eslint-disable-line
    const { localVersion } = this.store;

    this.updatedLocalVersion(values);
    this.store.showLocalVersion = true;
    LS.set('editor-post', localVersion);
  }

  @bind
  onEditorChange(content) {
    const title = Object(content.match('<h1.*?>(.*?)</h1>'))[1];

    if (!this.form.values.slugLock) {
      this.form.setValue('slug', titleToSlug(title));
    }

    this.updatedLocalVersion({
      title,
      content,
      updatedAt: Date.now()
    });

    this.form.setValues({ title });
    this.onChange(this.form.values);
  }

  @bind
  async onSave(values) {
    const { id, author, createdAt, ...rest } = this.store.localVersion;
    const data = { ...values, ...rest };

    if (author) {
      data.author = connectAuthor(author);
    }

    this.store.saving = true;
    const post = await updatePost({ id, data });
    this.store.saving = false;
    this.setPostData(post);

    this.store.localVersion = null;
    this.store.showLocalVersion = false;
    LS.set('editor-post', null);

    notify({
      type: 'success',
      title: 'Post updated',
    });
  }

  @bind
  toggleLocalVersion() {
    const { showLocalVersion, post, localVersion } = this.store;
    const showLocal = !showLocalVersion;
    const formVals = pickFormVals(showLocal ? localVersion : post);

    this.store.showLocalVersion = showLocal;
    this.form.setValues(formVals);
  }

  @bind
  renderForm({ isDirty, isValid, Field, form }) {
    const { saving, localVersion, showLocalVersion } = this.store;

    this.form = form;

    return (
      <Fragment key="post-editor-form">
        <div className={s.slugWrap}>
          <Field name="slug" className={s.slug} />
          <Field name="slugLock" component={Checkbox} type="checkbox" label="lock" />
        </div>
        <Field
          className={flex({ scrolled: true })}
          name="content"
          component={Editor}
          onChange={this.onEditorChange}
        />
        <div className={s.footer}>
          <Field name="published" component={Checkbox} type="checkbox" label="Published" />

          <div className={s.gap} />

          <Button
            className={s.localVersion}
            checked={showLocalVersion}
            disabled={!localVersion}
            onClick={this.toggleLocalVersion}
          >
            Local version
          </Button>
          <Button
            type="submit"
            loading={saving}
            disabled={!isDirty || !isValid}
          >
            Save
          </Button>
        </div>
      </Fragment>
    );
  }

  render() {
    const { post, loading } = this.store;
    const initialValues = pickFormVals(post);

    return (
      <Form
        className={flex()}
        loading={loading}
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onChange={this.onChange}
        onSubmit={this.onSave}
      >
        {this.renderForm}
      </Form>
    );
  }
}

export default React.memo(view(PostEditor));
