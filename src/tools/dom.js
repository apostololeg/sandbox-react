export function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

export function hasParent(elem, parentElem) {
  const isEqual = elem === parentElem;

  if (isEqual || elem.nodeName === 'BODY') {
    return isEqual
  }

  return hasParent(elem.parentNode, parentElem);
}
