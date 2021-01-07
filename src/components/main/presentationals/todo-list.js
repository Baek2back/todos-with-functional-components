import Component from '../../../common/component.js';
import '../presentationals/todo-item.js';

export default class TodoList extends Component {
  constructor() {
    super();
    this._list = [
      { id: 1, content: 'HTML', completed: true },
      { id: 2, content: 'HTML', completed: true }
    ];
  }
  connectedCallback() {
    this.innerHTML = this.render();
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
