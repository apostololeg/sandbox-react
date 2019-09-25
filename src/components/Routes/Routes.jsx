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
    <Router>
      <Home path="/"/>
      {isLogged && <Profile path="profile" />}
      {isAdmin && <LazyComponent
        path="admin"
        loading={() => import('components/Admin')}
      />}
      {isAdmin && <LazyArray routes={[
        [
          'posts/new',
          () => import('components/Admin/PostEditor')
        ],
        [
          'posts/edit/:postId',
          () => import('components/Admin/PostEditor')
        ]
      ]}/>

      [
        [
          'admin',
          () => import('components/Admin')
        ],
        [
          'posts/new',
          () => import('components/Admin/PostEditor')
        ],
        [
          'posts/edit/:postId',
          () => import('components/Admin/PostEditor')
        ]
      ].map(([path, loading]) => {
        const props = { path, loading, key: path };
        return <LazyComponent {...props} />;
      })}
      <LazyComponent
        path="posts"
        loading={() => import('components/Admin/Posts')}
      />
      <LazyComponent
        path="posts/new"
        loading={() => import('components/Admin/PostsEditor')}
      />
      <LazyComponent
        path="posts/edit/:postId"
        loading={() => import('components/Admin/PostsEditor')}
      />
      <Post path="post/:slug" />
      <Auth path="register" type="register"/>
      <Auth path="login" type="login"/>
      <Auth path="logout" type="logout" />
      <NoMatch default />
    </Router>
  );
}

export default view(Routes);
