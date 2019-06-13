import React from 'react';
import { view } from 'react-easy-state';
import cn from 'classnames';

import NotificationsStore, { close } from 'store/notifications';

import icons from './icons/';
import s from './Notifications.styl';

const Item = ({ id, type = 'info', title, content, visible }) => {
  const classes = cn(
    s.item,
    s[`item_type_${type}`],
    visible && s.item_visible
  );

  const Icon = icons[type];
  const Close = icons.close;

  return (
    <div className={classes}>
      <div className={s.itemInner}>
        <Icon className={s.icon} />
        {(title || content) && (
          <div className={s.text}>
            {title && (
              <div className={s.title}>
                {title}
              </div>
            )}
            {content && (
              <div className={s.content}>
                {content}
              </div>
            )}
          </div>
        )}
        <Close className={s.close} onClick={() => close(id)} />
      </div>
    </div>
  );
};

const Notifications = () => {
  const { autohide, data } = NotificationsStore;

  return (
    <div className={s.root}>
      {autohide.map(id => <Item {...data[id]} id={id} key={id} />)}
    </div>
  );
}

export default view(Notifications);
