import { withStore } from 'justorm/preact';

import Router from 'components/Router';
import LazyComponent from 'components/LazyComponent';
import Home from 'components/Home';
import Auth from 'components/Auth';

import NoMatch from './NoMatch';

export default withStore({
  user: ['isLogged', 'isAdmin'],
})(function Routes() {
  const { isLogged, isAdmin } = this.props.store.user;

  return (
    <Router>
      <Home path="/" exact />
      <Auth path="/register" type="register" />
      <Auth path="/login" type="login" />
      <Auth path="/logout" type="logout" />

      <LazyComponent
        path="/posts"
        exact
        loading={() => import('components/PostList')}
      />
      <LazyComponent
        path="/posts/:slug"
        loading={() => import('components/Post')}
      />

      {isLogged && (
        <LazyComponent
          path="/profile"
          loading={() => import('components/Profile')}
        />
      )}

      {isAdmin && [
        <LazyComponent
          path="/admin"
          loading={() => import('components/Admin')}
        />,
        <LazyComponent
          path="/posts/new"
          exact
          loading={() => import('components/Post/PostEditor')}
        />,
        <LazyComponent
          path="/posts/:slug/edit"
          loading={() => import('components/Post/PostEditor')}
        />,
        <LazyComponent
          path="/posts/:slug/preview"
          loading={() => import('components/Post')}
          preview
        />,
      ]}

      <NoMatch />
    </Router>
  );
});
