export function indexWhere(arr, val, fieldName) {
  if (!fieldName) {
    return arr.indexOf(val);
  }

  let index;

  arr.some((d, i) => {
    if (d[fieldName] === val) {
      index = i;
      return true;
    }
    return false
  });

  return index;
}

export function sliceWhere(arr, val, fieldName) {
  const index = indexWhere(arr, val, fieldName);

  return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ];
}

export default {};
