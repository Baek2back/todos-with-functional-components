import Template from './template.js';
export default class TodoList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = Template.render();
  }
}
customElements.define('todos-todo-list', TodoList);
