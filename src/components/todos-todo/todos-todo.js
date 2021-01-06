import Template from './template.js';

export default class TodosTodo extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = Template.render();
  }
}

customElements.define('todos-todo', TodosTodo);
