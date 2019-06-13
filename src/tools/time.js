const state = {};

function add(time, data) {
  if (!state[time]) {
    state[time] = [data];
    return;
  }

  state[time].push(data);
}

const at = (time, cb) => add(time, { cb });
const after = (ms, cb) => add(Date.now() + ms, { cb });
const every = (ms, cb) => add(Date.now() + ms, { cb, repeat: ms });
const tick = cb => add(Date.now(), { cb, repeat: 0 });
const nextTick = cb => at(Date.now(), cb);

function frame() {
  const now = Date.now();

  Object.keys(state).some(time => {
    if (parseInt(time, 10) > now) {
      return true;
    }

    state[time].forEach(({ cb, repeat }) => {
      cb();
      if (typeof repeat === 'number') {
        every(repeat, cb);
      }
    });
    delete state[time];
    return false;
  });

  window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);

export default {
  at,
  after,
  every,
  tick,
  nextTick
};
