import React, { Fragment, Component } from 'react'
import { store, view } from 'react-easy-state'
import { bind, debounce } from 'decko'
import pick from 'lodash/pick'

import LS from 'tools/localStorage'
import time from 'tools/time'

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
  constructor(props) {
    super(props);

    const localVersion = this.loadLocal();

    this.store = store({
      localVersion,
      showLocalVersion: Boolean(localVersion),
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
  }

  async componentDidMount() {
    const { postId } = this.props;

    this.validationSchema = {
      slug: { type: 'string' },
      content: { type: 'string' }
    };

    if (postId) {
      this.store.loading = true;
      const post = await getPost({ id: postId });
      this.store.loading = false;
      this.setPostData(post);

      if (this.isLocal()) {
        time.nextTick(() => this.toggleLocalVersion(true));
      }
    } else {
      await this.createNewPost();
    }
  }

  isLocal() {
    const { postId } = this.props;
    const { localVersion } = this.store;

    return Object(localVersion).id === postId;
  }

  getLocalNamespace() {
    const { postId } = this.props;

    return `editor-post-${postId}`;
  }

  loadLocal() {
    return LS.get(this.getLocalNamespace());
  }

  saveLocal(postData) {
    if (postData !== undefined) {
      this.store.localVersion = postData;
    }

    LS.set(this.getLocalNamespace(), this.store.localVersion);
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

  updateLocalVersion(patch) {
    const { post, localVersion } = this.store;

    if (!localVersion) {
      this.saveLocal({ ...post, ...patch });
    } else {
      Object.assign(localVersion, patch);
      this.saveLocal();
    }
  }

  @bind
  @debounce(600)
  onChange(values) {
    this.updateLocalVersion(values);
    this.store.showLocalVersion = true;
  }

  @bind
  onEditorChange(content) {
    const title = Object(content.match('<h1.*?>(.*?)</h1>'))[1];
    const { values } = this.form;

    if (values.content === content) {
      return
    }

    if (!values.slugLock) {
      this.form.setValue('slug', titleToSlug(title));
    }

    this.updateLocalVersion({
      title,
      content,
      updatedAt: Date.now()
    });

    this.form.setValue('title', title);
    this.onChange(values);
  }

  @bind
  async onSave(values) {
    const { localVersion, post } = this.store;

    const isLocal = this.isLocal();
    const sourcePost = isLocal ? localVersion : post
    const { id, author, createdAt, ...rest } = sourcePost;
    const data = { ...rest, ...values };

    if (isLocal && author) {
      data.author = connectAuthor(author);
    }

    this.store.saving = true;
    const postData = await updatePost({ id, data });
    this.store.saving = false;
    this.setPostData(postData);

    this.store.showLocalVersion = false;
    this.saveLocal(null);

    notify({
      type: 'success',
      title: 'Post updated',
    });
  }

  @bind
  toggleLocalVersion(show) {
    const { post, localVersion, showLocalVersion } = this.store;
    const showLocal = typeof show === 'boolean' ? show : !showLocalVersion;
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
