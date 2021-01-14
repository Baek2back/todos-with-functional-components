import { applyCSS, createTemplate, dataAttrSelector } from '../common/utils.js';

const html = /*html*/ `
  <button class="btn">Clear completed (<span class="complete-todos"></span>)</button>
`;

const template = createTemplate(html);

const buttonSelector = dataAttrSelector('component', 'button');

const css = /*css*/ `
  ${buttonSelector} {
    display: inline;
  }
  ${buttonSelector} .btn {
    padding: 1px 5px;
    font-size: 0.8em;
    line-height: 1.5;
    border-radius: 3px;
    outline: none;
    color: #333;
    background-color: #fff;
    border-color: #ccc;
    cursor: pointer;
  }

  ${buttonSelector} .btn:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
`;

applyCSS(css);

const Button = (props) => {
  const { currentTodos } = props;
  const newButton = template.content.cloneNode(true);
  newButton.querySelector('span').textContent = currentTodos.filter(
    (todo) => todo.completed
  ).length;
  newButton.querySelector(`button`).disabled =
    newButton.querySelector('span').textContent === '0';
  return newButton;
};

export default Button;
