import { h, Component, Fragment } from 'preact'
import { store, view } from 'preact-easy-state'

import { setTitle } from 'store/page'
import { getPosts } from 'store/post'

import Flex, { mix as flex } from 'components/UI/Flex'
import Spinner from 'components/UI/Spinner'

import s from './Post.styl';

class Post extends Component {
  store = store({
    data: {},
    loading: false
  });

  componentDidMount() {
    this.loadPost();
  }

  async loadPost() {
    const { slug } = this.props;

    this.store.loading = true;
    this.store.data = (await getPosts({ slug })).pop();
    this.store.loading = false;
    setTitle(this.store.data.title);
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
    const { className } = this.store;

    return (
      <div
        className={flex('scrolled', className, s.root)}
        onScroll={this.onScroll}
      >
        {this.renderContent()}
      </div>
    );
  }
}

export default view(Post);
