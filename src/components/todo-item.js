import Component from '../common/component.js';

export default class TodoItem extends Component {
  constructor() {
    super();
    this.innerHTML = this.render();
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }
  html() {
    return /*html*/ `
    <li id="${this.id}" class="todo-item">
      <input id="${this.prefix}-${this.id}" class="checkbox" type="checkbox" ${
      this.completed === 'true' ? 'checked' : ''
    }/>
      <label for="${this.prefix}-${this.id}">${this.content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>
    `;
  }
  css() {
    return /*html*/ `
    <style>
      todos-todo-item .todo-item {
        position: relative;
        height: 50px;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-color: #e7ecee;
        list-style: none;
      }

      todos-todo-item .todo-item:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      todos-todo-item .todo-item:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      todos-todo-item .remove-todo {
        display: none;
        position: absolute;
        top: 50%;
        right: 10px;
        cursor: pointer;
        transform: translate3d(0, -50%, 0);
      }

      todos-todo-item .todo-item:hover > .remove-todo {
        display: block;
      }
    </style>
    `;
  }

  get prefix() {
    return this.getAttribute('prefix');
  }
  set prefix(value) {
    this.setAttribute('prefix', value);
  }

  get id() {
    return this.getAttribute('id');
  }
  set id(value) {
    this.setAttribute('id', value);
  }

  get content() {
    return this.getAttribute('content');
  }
  set content(value) {
    this.setAttribute('content', value);
  }

  get completed() {
    return this.getAttribute('completed');
  }
  set completed(val) {
    this.setAttribute('completed', val);
  }
}

!customElements.get('todos-todo-item') &&
  customElements.define('todos-todo-item', TodoItem);
