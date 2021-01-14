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

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  return length;
};

const Counter = (targetElement, { todos }) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.appendChild(template.content.cloneNode(true));
  const count = newCounter.querySelector('.active-todos');
  count.textContent = getTodoCount(todos);
  return newCounter;
};

export default Counter;
