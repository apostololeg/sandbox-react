import { h, Component, Fragment, createRef } from 'preact'
import { store, view } from 'preact-easy-state'

import LS from 'tools/localStorage'
import Time from 'tools/time'

import UserStore from 'store/user'
import { getPosts } from 'store/post'

import { Title } from 'components/Header'
import { hydrateComponents, PostRenderHelpers } from 'components/Editor'
import { Link } from 'components/Router'
import Flex, { mix as flex } from 'components/UI/Flex'
import Spinner from 'components/UI/Spinner'

import s from './Post.styl';

@view
class Post extends Component {
  container = createRef();

  store = store({
    data: {},
    loading: false,
    hasPreview: false
  });

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      this.init();
    }
  }

  init() {
    const { preview } = this.props;

    if (preview) {
      this.loadLocal();
      return
    }

    this.loadRemote();
  }

  loadLocal() {
    const { slug } = this.props;

    this.store.data = LS.get(`editor-post-${slug}`);
    this.store.hasPreview = true;

    this.hydrate();
  }

  async loadRemote() {
    const { slug } = this.props;

    this.store.loading = true;
    const posts = await getPosts({ slug });
    this.store.data = posts.pop();
    this.store.loading = false;

    this.hydrate();
  }

  hydrate() {
    Time.after(100, () => {
      if (this.store.data) {
        hydrateComponents(this.container.current);
      }
    });
  }

  renderTitle() {
    const { data, hasPreview } = this.store;
    const { slug } = data;

    return (
      <Fragment>
        <Link href={`/posts/${slug}/edit`}>Edit</Link>
        {hasPreview && <Link href={`/posts/${slug}`}>Original</Link>}
      </Fragment>
    )
  }

  renderContent() {
    const { data, loading } = this.store;

    if (loading) {
      return <Flex><Spinner /></Flex>;
    }

    const { author, createdAt, content } = data;

    return (
      <Fragment>
        <div
          ref={this.container}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className={s.footer}>
          {author && (author.name || author.email)}
          {new Date(createdAt)}
        </div>
      </Fragment>
    );
  }

  render() {
    const { isAdmin } = UserStore;
    const { className, data } = this.store;

    if (!data) {
      return 'Failed to fetch post data.';
    }

    return (
      <Fragment>
        <PostRenderHelpers />
        <Title text={data.title}>
          {isAdmin && this.renderTitle()}
        </Title>
        <div
          className={flex('scrolled', className, s.root)}
          onScroll={this.onScroll}
        >
          {this.renderContent()}
        </div>
      </Fragment>
    );
  }
}

export default Post;
