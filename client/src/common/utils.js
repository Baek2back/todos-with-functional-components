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
