import Template from './template.js';

export default class TodosInput extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = Template.render();
  }
}

customElements.define('todos-input', TodosInput);
