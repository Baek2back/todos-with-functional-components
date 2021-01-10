import Component from './common/component.js';
import './containers/header-container.js';
import './containers/main-container.js';

export default class App extends Component {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }

  html() {
    return /*html*/ `
    <todos-header-container></todos-header-container>
    <todos-main-container></todos-main-container>
    `;
  }

  css() {
    return /*html*/ `
    <style>
      :host {
        display: block;
        max-width: 750px;
        min-width: 450px;
        padding: 15px;
        margin: 0 auto;
      }
    </style>
    `;
  }
}

!customElements.get('todos-app') && customElements.define('todos-app', App);
