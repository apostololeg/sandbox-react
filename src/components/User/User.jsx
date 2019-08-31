import React from 'react'
import { view } from 'react-easy-state'

import UserStore from 'store/user'
import PageStore from 'store/page'

import Link from 'components/UI/Link'
import Popup from 'components/UI/Popup'
import Menu, { MenuItem } from 'components/UI/Menu'

import DefaultIcon from './icons/avatar.svg'
import s from './User.styl'

function Userpic({ url }) {
  if (!url) {
    return <DefaultIcon className={s.avatar} />
  }

  return (
    <div
      className={s.avatar}
      style={{ backgroundImage: `url(${url})` }}
    />
  );
}

function getMenuLinks({ isAuth, isLogged, isAdmin }) {
  const items = [];

  if (isLogged) {
    if (isAdmin) {
      items.push(['/admin', 'Admin panel']);
    }

    items.push(
      ['/profile', 'Profile'],
      ['/logout', 'Logout']
    );
  } else if (!isAuth) {
    items.push(['/login', 'Sign in']);
  }

  return items;
}

function User() {
  const { isLogged, isAdmin, email, name, avatar } = UserStore;
  const { isAuth } = PageStore;
  const items = getMenuLinks({ isLogged, isAdmin, isAuth });

  return (
    <Popup autoClose>
      <div className={s.user}>
        <div className={s.userName}>
          {email || name || 'Guest'}
        </div>
        <Userpic url={avatar} />
      </div>
      {items.length > 0 && (
        <Menu className={s.menu} align="right">
          {items.map(([path, text]) => (
            <MenuItem key={path}>
              <Link to={path}>{text}</Link>
            </MenuItem>
          ))}
        </Menu>
      )}
    </Popup>
  );
}

export default view(User);
