import { getCoords } from 'tools/dom';

const METRICS = {
  horizontal: {
    size: 'offsetWidth',
    scroll: 'scrollLeft',
    direction: {
      before: 'left',
      after: 'right'
    }
  },
  vertical: {
    size: 'offsetHeight',
    scroll: 'scrollTop',
    direction: {
      before: 'top',
      after: 'bottom'
    }
  }
};

const OPPOSITE_METRICS = {
  horizontal: METRICS.vertical,
  vertical: METRICS.horizontal
};

export function parseMetrics(direction) {
  return direction.split('-');
}

function getAxisLayout(axis) {
  if (/horizontal|vertical/.test(axis)) return axis;
  if (/top|bottom/.test(axis)) return 'vertical';
  if (/left|right/.test(axis)) return 'horizontal';
  return null;
}

export function getAxis(axis, trigger, scrollParent) {
  const triggerOffset = getCoords(trigger);

  if (!axis) {
    const offsetTop = triggerOffset.top - scrollParent.scrollTop;
    const offsetLeft = triggerOffset.left - scrollParent.scrollLeft;
    const axisBySize = {
      [scrollParent.offsetHeight - offsetTop]: 'bottom',
      [scrollParent.offsetWidth - offsetLeft]: 'right',
      [offsetTop]: 'top',
      [offsetLeft]: 'left'
    };

    return axisBySize[Math.max(Object.keys(axisBySize))];
  }

  if (/vertical|horizontal/.test(axis)) {
    const m = METRICS[axis];
    const offsetBefore =
      triggerOffset[m.direction.before] - scrollParent[m.scroll];
    const newAxis =
      offsetBefore > scrollParent[m.size] - offsetBefore ? 'before' : 'after';

    return m.direction[newAxis];
  }

  return axis;
}

export function getFloat(axis, trigger, scrollParent) {
  const m = OPPOSITE_METRICS[getAxisLayout(axis)];
  const triggerOffset = getCoords(trigger);

  const toBefore =
    triggerOffset[m.direction.before] -
    scrollParent[m.scroll] +
    trigger[m.size];
  const toAfter = scrollParent[m.size] - toBefore;
  const newFloat = toBefore > toAfter ? 'before' : 'after';

  return m.direction[newFloat];
}
