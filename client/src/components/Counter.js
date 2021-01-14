import { applyCSS, createTemplate, dataAttrSelector } from '../common/utils.js';

const html = /*html*/ `
  <strong class="active-todos"></strong>
`;

const counterSelector = dataAttrSelector('component', 'counter');

const css = /*css*/ `
  ${counterSelector} {
    display: inline;
  }
`;

applyCSS(css);

const template = createTemplate(html);

const Counter = (targetElement) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.appendChild(template.content.cloneNode(true));
  const count = newCounter.querySelector('.active-todos');
  count.textContent = 2;
  return newCounter;
};

export default Counter;
