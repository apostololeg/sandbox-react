import { h, Component, Fragment } from 'preact'
import { store, view } from 'preact-easy-state'

import LS from 'tools/localStorage'

import UserStore from 'store/user'
import { getPosts } from 'store/post'

import { Title } from 'components/Header'
import { Link } from 'components/Router'
import Flex, { mix as flex } from 'components/UI/Flex'
import Spinner from 'components/UI/Spinner'

import s from './Post.styl';

class Post extends Component {
  store = store({
    data: {},
    loading: false,
    hasPreview: false
  });

  componentDidMount() {
    const { preview, slug } = this.props;

    if (preview) {
      this.store.data = LS.get(`editor-post-${slug}`);
      this.store.hasPreview = true;
      return
    }

    this.loadPost();
  }

  async loadPost() {
    const { slug } = this.props;

    this.store.loading = true;
    const posts = await getPosts({ slug });
    this.store.data = posts.pop();
    this.store.loading = false;
  }

  renderTitle() {
    const { data, hasPreview } = this.store;
    const { slug, title } = data;

    return (
      <Fragment>
        <Link href={`/posts/${slug}/edit`}>Edit</Link>
        {hasPreview && <Link href={`/posts/${slug}`}>Original</Link>}
      </Fragment>
    )
  }

  renderLayout() {
    const { isAdmin } = UserStore;
    const { className, data } = this.store;
    const { title } = data;

    return (
      <Fragment>
        <Title text={title}>
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

  renderContent() {
    const { data, loading } = this.store;

    if (loading) {
      return <Flex><Spinner /></Flex>;
    }

    const { author, content } = data;

    return (
      <Fragment>
        {author && (author.name || author.email)}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Fragment>
    );
  }

  render() {
    if (!this.store.data) {
      return 'Failed to fetch post data.';
    }

    return this.renderLayout()
  }
}

export default view(Post);
