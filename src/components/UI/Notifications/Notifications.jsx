import { h } from 'preact';
import { view } from 'preact-easy-state';
import cn from 'classnames';

import NStore, { pause, unpause, close } from 'store/notifications';

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
    <div
      className={classes}
      onMouseOver={pause}
      onFocus={pause}
      onTouchStart={pause}
      onMouseOut={unpause}
      onBlur={unpause}
      onTouchEnd={unpause}
    >
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
  const { items, data } = NStore;

  return (
    <div className={s.root}>
      {items.map(id => <Item {...data[id]} id={id} key={id} />)}
    </div>
  );
}

export default view(Notifications);
