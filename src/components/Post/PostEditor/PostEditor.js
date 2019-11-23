import { h, Fragment, Component } from 'preact'
import { memo } from 'preact/compat'
import { store, view } from 'preact-easy-state'
import { bind, debounce } from 'decko'
import pick from 'lodash/pick'
import nanoid from 'nanoid'

import LS from 'tools/localStorage'
import time from 'tools/time'

import UserStore from 'store/user'
import { notify } from 'store/notifications'
import { getPosts, createPost, updatePost } from 'store/post'

import Form from 'components/UI/Form'
import { mix as flex } from 'components/UI/Flex'
import Checkbox from 'components/UI/Checkbox'
import Button from 'components/UI/Button'

import { Title, Gap } from 'components/Header'
import { Link } from 'components/Router'
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
      showLocalVersion: false,
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

  validationSchema = {
    slug: { type: 'string' },
    content: { type: 'string' }
  };

  componentDidMount() {
    const { slug } = this.props;

    document.addEventListener('keydown', this.onKeyDown);

    if (slug) {
      this.loadRemote(slug);
    } else {
      this.createNewPost();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  getLocalNamespace() {
    const { slug } = this.props;

    return `editor-post-${slug}`;
  }

  async loadRemote(slug) {
    const { localVersion } = this.store;

    this.store.loading = true;
    const post = (await getPosts({ slug }))[0];
    this.store.loading = false;
    this.setPostData(post);

    const isLocalNewer = localVersion &&
      new Date(localVersion.updatedAt) > new Date(post.updatedAt);

    if (isLocalNewer) {
      this.onFormAPI = () => {
        this.onFormAPI = null;
        this.toggleLocalVersion(true);
      };
    }

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

  getCurrentViewData() {
    const { post, localVersion, showLocalVersion } = this.store;

    return showLocalVersion ? localVersion : post;
  }

  @bind
  async createNewPost() {
    const { route } = this.props;
    const { post } = this.store;

    if (!post.author) {
      post.author = connectAuthor(UserStore.email);
    }

    if (!post.slug) {
      post.slug = nanoid();
    }

    this.store.inProgress = true;

    try {
      const data = await createPost(post);
      this.setPostData(data)
      this.store.inProgress = false;
      route.navigate(`/posts/${data.slug}/edit`, { replace: true });
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

  onFormAPI = null;

  @bind
  onKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      e.stopPropagation();
      this.onSave();
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
    const h1 = content.replace(/(<br>|&nbsp;)/g, '').match('<h1.*?>(.*?)</h1>');
    const title = h1?.[1];
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
  async onSave(values = this.form.values) {
    const { route } = this.props;
    const { localVersion, post } = this.store;

    const { id } = post;
    const { author, createdAt, ...rest } = localVersion;
    const data = { ...rest, ...values };

    if (author) {
      data.author = connectAuthor(author);
    }

    this.store.saving = true;
    const postData = await updatePost({ id, data });
    this.store.saving = false;
    this.setPostData(postData);

    if (post.slug !== postData.slug) {
      route.replaceState(`/posts/${postData.slug}/edit`);
    }

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
    const showLocal = show || !showLocalVersion;
    const postData = showLocal ? localVersion : post;

    this.store.showLocalVersion = showLocal;
    this.form.setValues(pickFormVals(postData));
  }

  renderTitle(showOriginal) {
    const { loading, post } = this.store;

    if (loading) {
      return null
    }

    const { title, slug } = this.getCurrentViewData();

    function TitleContent() {
      if (!showOriginal)
        return null;

      if (post.slug !== slug)
        return '[Save new slug before preview]'

      return (
        <Fragment>
          <Link href={`/posts/${slug}/preview`}>Preview</Link>
          <Link href={`/posts/${slug}`}>Original</Link>
        </Fragment>
      );
    }

    return (
      <Title text={title || 'New post'}>
        <TitleContent />
      </Title>
    );
  }

  @bind
  renderForm({ isDirty, isValid, Field, form }) {
    const {
      saving,
      post,
      localVersion,
      showLocalVersion
    } = this.store;

    this.form = form;

    if (this.onFormAPI) {
      this.onFormAPI();
    }

    return (
      <Fragment key="post-editor-form">
        {this.renderTitle(isDirty)}
        <div className={s.slugWrap}>
          <Field name="slug" className={s.slug} />
          <Field
            name="slugLock"
            component={Checkbox}
            type="checkbox"
            label="lock"
            clearMargins
          />
        </div>
        <Field
          className={flex('scrolled')}
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
            onClick={() => this.toggleLocalVersion()}
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
    const { loading, post } = this.store;
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

export default memo(view(PostEditor));
