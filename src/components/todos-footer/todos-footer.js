import Template from './template.js';

export default class TodosFooter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = Template.render();
  }
}

customElements.define('todos-footer', TodosFooter);
