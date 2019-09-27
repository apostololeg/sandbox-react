import { h } from 'preact'
import { view } from 'preact-easy-state'

import userStore from 'store/user'

import LazyComponent from 'components/LazyComponent'
import Home from 'components/Home'
import Auth from 'components/Auth'

import Router from './Router'
import NoMatch from './NoMatch'

function Routes() {
  const { isLogged, isAdmin } = userStore;

  return (
    <Router>
      <Home path="/"/>
      <Auth path="/register" type="register"/>
      <Auth path="/login" type="login"/>
      <Auth path="/logout" type="logout" />

      <LazyComponent
        path="/posts"
        loading={() => import('components/PostList')}
      />
      <LazyComponent
        path="/post/:slug"
        loading={() => import('components/Post')}
      />

      {isLogged && <LazyComponent
        path="/profile"
        loading={() => import('components/Profile')}
      />}

      {isAdmin && [
        <LazyComponent
          path="/admin"
          loading={() => import('components/Admin')}
        />,
        <LazyComponent
          path="/posts/new"
          loading={() => import('components/Admin/PostEditor')}
        />,
        <LazyComponent
          path="/posts/edit/:postId"
          loading={() => import('components/Admin/PostEditor')}
        />
      ]}

      <NoMatch />
    </Router>
  );
}

export default view(Routes);
