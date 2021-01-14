export const applyCSS = (css) => {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
};

export const createTemplate = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
};

export const dataAttrSelector = (attr, component) =>
  `[data-${attr}=${component}]`;

export const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export const deepFreeze = (obj) => {
  if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
    Object.freeze(obj);
    Object.keys(obj).forEach((key) => deepFreeze(obj[key]));
  }
  return obj;
};
