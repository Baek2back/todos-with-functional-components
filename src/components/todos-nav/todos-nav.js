import Template from './template.js';

export default class TodosNav extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = Template.render();
  }
}

customElements.define('todos-nav', TodosNav);
