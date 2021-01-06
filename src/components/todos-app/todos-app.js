import Template from './template.js';

export default class TodosApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = Template.render();
  }
}

customElements.define('todos-app', TodosApp);
