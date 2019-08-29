import React, { Component } from 'react'
import { store, view } from 'react-easy-state'

import { getPosts } from 'store/post'

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
  }

  render() {
    const { data } = this.store;
    const { author, content } = data;

    return (
      <div>
        {author && (author.name || author.email)}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default view(Post);
