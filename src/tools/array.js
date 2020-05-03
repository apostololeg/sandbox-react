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
    return false;
  });

  return index;
}

export function sliceWhere(arr, val, fieldName) {
  const index = indexWhere(arr, val, fieldName);

  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function setListMap(arr, obj, data, fieldName) {
  const fieldVal = data[fieldName];
  const i = indexWhere(arr, fieldVal, fieldName);

  obj[fieldVal] = data;

  if (i > -1) {
    arr.splice(i, 1, data);
  } else {
    arr.push(data);
  }
}

export function delListMap(arr, obj, fieldName, fieldVal) {
  const index = indexWhere(arr, fieldVal, fieldName);

  delete obj[fieldVal];
  arr.splice(index, 1);
}
