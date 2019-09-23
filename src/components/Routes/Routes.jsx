import { h } from 'preact'
import { Router } from 'preact-router'
import { view } from 'preact-easy-state'
import userStore from 'store/user'

import LazyComponent from 'components/LazyComponent'

import Home from 'components/Home'
import Profile from 'components/Profile'
import Auth from 'components/Auth'
import Post from 'components/Post'

import NoMatch from './NoMatch'

function Routes() {
  const { isLogged, isAdmin } = userStore;

  return (
    <Router style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
      <Home path="/"/>
      {isLogged && <Profile path="profile" />}
      {isAdmin && [
        [
          'admin',
          () => import('components/Admin')
        ],
        [
          'admin/posts',
          () => import('components/Admin/Posts')
        ],
        [
          'admin/posts/new',
          () => import('components/Admin/PostEditor')
        ],
        [
          'admin/posts/edit/:postId',
          () => import('components/Admin/PostEditor')
        ]
      ].map(([path, loading]) => {
        const props = { path, loading, key: path };
        return <LazyComponent {...props} />;
      })}
      <Post path="post/:slug" />
      <Auth path="register" type="register"/>
      <Auth path="login" type="login"/>
      <Auth path="logout" type="logout" />
      <NoMatch default />
    </Router>
  );
}

export default view(Routes);
