import Component from '../common/component.js';
import './todo-item.js';

export default class TodoList extends Component {
  set list(val) {
    this._list = val;
    this.innerHTML = this.render();
  }

  get list() {
    return this._list;
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }

  html() {
    return /*html*/ `
    <ul class="todos">
      ${this._list
        .map(
          ({ id, content, completed }) =>
            `<todos-todo-item id=${id} content="${content}" completed="${completed}" prefix="ck"></todos-todo-item>`
        )
        .join('')}
    </ul>
    `;
  }

  css() {
    return /*html*/ `
    <style>
      todos-todo-list .todos {
        margin-top: 20px;
      }
    </style>
    `;
  }
}

!customElements.get('todos-todo-list') &&
  customElements.define('todos-todo-list', TodoList);
