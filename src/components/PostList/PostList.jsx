import { h, Fragment, Component } from 'preact'
import { bind } from 'decko'
import { store, view } from 'preact-easy-state'

import { sliceWhere } from 'tools/array'

import { notify } from 'store/notifications'
import { getPosts, deletePost } from 'store/post'
import userStore from 'store/user'

import { Link } from 'components/Router'
import { Title } from 'components/Header'
import Flex from 'components/UI/Flex'
import Menu, { MenuItem } from 'components/UI/Menu'
import Spinner from 'components/UI/Spinner'
import Button from 'components/UI/Button'

import s from './PostList.styl'

@view
class PostList extends Component {
  store = store({
    items: [],
    loading: false,
    deleting: {},
  });

  componentDidMount() {
    this.loadPosts();
  }

  @bind
  async loadPosts() {
    this.store.loading = true;

    try {
      const items = await getPosts();
      Object.assign(this.store, { items, loading: false });
    } catch(e) {
      this.store.loading = false;
      notify({
        type: 'error',
        title: 'loading post failed',
        content: e.message
      });
    }
  }

  async deletePost(id) {
    const { items, deleting } = this.store;

    deleting[id] = true;
    await deletePost(id);
    deleting[id] = false;
    this.store.items = sliceWhere(items, id, 'id');
  }

  @bind
  renderItem({ id, slug, title }) {
    const { isAdmin } = userStore;

    return (
      <MenuItem key={id}>
        <Link href={slug} isClear>
          <h2>{title || `[${slug}]`}</h2>
        </Link>
        {isAdmin && [
          <Link href={`${slug}/edit`}>Edit</Link>,
          <Button
            onClick={() => this.deletePost(id)}
            loading={this.store.deleting[id]}
          >
            Remove
          </Button>
        ]}
      </MenuItem>
    );
  }

  renderList() {
    const { items } = this.store;

    return (
      <Menu>
        {items.map(this.renderItem)}
      </Menu>
    )
  }

  render() {
    const { isAdmin } = userStore;
    const { loading } = this.store;

    return (
      <Fragment>
        <Title text="Posts">
          {isAdmin && <Link href="new">Create New</Link>}
        </Title>
        <Flex scrolled centered={loading}>
          {loading ? <Spinner size="l"/> : this.renderList()}
        </Flex>
      </Fragment>
    );
  }
}

export default PostList;
