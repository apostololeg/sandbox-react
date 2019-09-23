import { store } from 'preact-easy-state';
import nanoid from 'nanoid';

import time from 'tools/time';
import { sliceWhere } from 'tools/array';

const SHOW_TIME = 5000;
const ANIMATION_DURATION = 200;

const Notifications = store({
  items: [],
  autohide: [],
  data: {},
  paused: false,
});

export default Notifications;

const removeById = (arrName, id) => {
  Notifications[arrName] = sliceWhere(Notifications[arrName], id);
};

export const remove = id => {
  removeById('items', id);
  removeById('autohide', id);
  Notifications.data[id] = null;
};

export const show = id => Notifications.data[id].visible = true;
export const hide = id => Notifications.data[id].visible = false;
export const close = id => {
  hide(id);
  time.after(ANIMATION_DURATION, () => remove(id));
};

export const notify = data => {
  const id = nanoid();

  Notifications.items.push(id);
  Notifications.data[id] = {
    ...data,
    createdAt: Date.now()
  };

  time.after(ANIMATION_DURATION, () => show(id));

  if (!data.modal) {
    Notifications.autohide.push(id);
  }
};

export const pause = () => {
  Notifications.paused = true;
  Notifications.pausedAt = Date.now();
};
export const unpause = () => {
  const { data, pausedAt, autohide } = Notifications;
  const pauseTime = Date.now() - pausedAt;

  autohide.forEach(id => {
    data[id].createdAt += pauseTime;
  });

  Notifications.paused = false;
};

function tick() {
  const { paused, autohide, data } = Notifications;

  if (paused || autohide.length === 0) {
    return;
  }

  // TODO: move trough all autohide until some will !readyToHide
  const id = autohide[0]
  const item = data[id];
  const readyToHide = Date.now() - item.createdAt > SHOW_TIME;

  if (item.visible && readyToHide) {
    item.visible = false;
    time.after(ANIMATION_DURATION, () => remove(id));
  }
}

time.tick(tick);
