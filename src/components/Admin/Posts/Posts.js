import React, { Fragment, Component } from 'react'
import { bind } from 'decko'
import { store, view } from 'react-easy-state'

import { sliceWhere } from 'tools/array'

import { notify } from 'store/notifications'
import { getPosts, deletePost } from 'store/post'

import Flex from 'components/UI/Flex'
import Menu, { MenuItem } from 'components/UI/Menu'
import Spinner from 'components/UI/Spinner'
import Button from 'components/UI/Button'
import Link from 'components/UI/Link'

import s from './Posts.styl'

class Posts extends Component {
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
  renderItem({ id, title }) {
    return (
      <MenuItem key={id}>
        <h2>{title}</h2>
        <Link to={`edit/${id}`}>Edit</Link>
        <Button
          onClick={() => this.deletePost(id)}
          loading={this.store.deleting[id]}
        >
          Remove
        </Button>
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
    const { loading } = this.store;

    return (
      <Fragment>
        <div className={s.header}>
          <div className={s.gap} />
          <Link to="new">Create New</Link>
        </div>
        <Flex scrolled centered={loading}>
          {loading ? <Spinner size="l"/> : this.renderList()}
        </Flex>
      </Fragment>
    );
  }
}

export default view(Posts);
