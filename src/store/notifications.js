import { store } from 'react-easy-state';
import nanoid from 'nanoid';
import time from 'tools/time';

const HIDE_TIMEOUT = 5000;
const ANIMATION_DURATION = 200;

const Notifications = store({
  items: [],
  autohide: [],
  data: {},
  paused: false,
});

export default Notifications;

const removeById = (arrName, id) => {
  const arr = Notifications[arrName];
  const index = arr.indexOf(id);

  Notifications[arrName] = [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ];
};

export const remove = id => {
  removeById('items', id);
  removeById('autohide', id);
  delete Notifications.data[id];
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
  const item = data[autohide[0]];
  const readyToHide = Date.now() - item.createdAt > HIDE_TIMEOUT;

  if (item.visible && readyToHide) {
    item.visible = false;
    time.after(ANIMATION_DURATION, () => autohide.shift());
  }
}

time.tick(tick);
