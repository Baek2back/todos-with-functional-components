import Template from './template.js';

export default class TodosHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = Template.render();
  }
}

customElements.define('todos-header', TodosHeader);
