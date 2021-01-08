export const objectEquals = (a, b) => {
  if (Object.is(a, b)) return true;
  const aKey = Object.keys(a);
  const bKey = Object.keys(b);
  if (aKey.length !== bKey.length) return false;
  for (const key of aKey) {
    if (
      typeof a[key] === 'object' &&
      a[key] !== null &&
      typeof b[key] === 'object' &&
      b[key] !== null
    ) {
      if (!objectEquals(a[key], b[key])) return false;
    } else if (typeof a[key] === 'function' && typeof b[key] === 'function') {
      if (a[key].toString() !== b[key].toString()) return false;
    } else if (a[key] !== b[key]) return false;
  }
  return true;
};

export const mapValues = (obj, fn) => {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
};

export const compose = (...funcs) =>
  funcs.reduceRight((composed, f) => f(composed));

export const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
