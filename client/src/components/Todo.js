import { applyCSS, createTemplate, dataAttrSelector } from '../common/utils.js';

const html = /*html*/ `
  <li data-component="todo">
    <input class="checkbox" type="checkbox">
    <label></label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>
`;

const template = createTemplate(html);

const todoSelector = dataAttrSelector('component', 'todo');

const css = /*css*/ `
  ${todoSelector} {
    position: relative;
    height: 50px;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-color: #e7ecee;
    list-style: none;
  }

  ${todoSelector}:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  ${todoSelector}:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  /*
    .checkbox
    .checkbox 바로 뒤에 위치한 label의 before와 after를 사용해
    .checkbox의 외부 박스와 내부 박스를 생성한다.

    <input class="checkbox" type="checkbox" id="myId">
    <label for="myId">Content</label>
  */
  ${todoSelector} .checkbox {
    display: none;
  }

  ${todoSelector} .checkbox + label {
    position: absolute; /* 부모 위치를 기준으로 */
    top: 50%;
    left: 15px;
    transform: translate3d(0, -50%, 0);
    display: inline-block;
    width: 90%;
    line-height: 2em;
    padding-left: 35px;
    cursor: pointer;
    user-select: none;
  }

  ${todoSelector} .checkbox + label:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 0);
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #cfdadd;
  }

  ${todoSelector} .checkbox:checked + label:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translate3d(0, -50%, 0);
    width: 10px;
    height: 10px;
    background-color: #23b7e5;
  }

  /* .remove-todo button */
  ${todoSelector} .remove-todo {
    display: none;
    position: absolute;
    top: 50%;
    right: 10px;
    cursor: pointer;
    transform: translate3d(0, -50%, 0);
  }

  /* todo-item이 호버 상태이면 삭제 버튼을 활성화 */
  ${todoSelector}:hover > .remove-todo {
    display: block;
  }
`;

applyCSS(css);

const Todo = ({ id, content, completed }) => {
  const newTodo = template.content.cloneNode(true);
  newTodo.querySelector('li').id = id;
  newTodo.querySelector('input').id = `ck-${id}`;
  newTodo.querySelector('input').checked = completed;
  newTodo.querySelector('label').htmlFor = `ck-${id}`;
  newTodo.querySelector('label').textContent = content;
  return newTodo;
};

export default Todo;
