import Component from './common/component.js';
import './components/header/container/header-container.js';
import './components/main/container/main-container.js';
import './components/footer/container/footer-container.js';

export default class App extends Component {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.render();
    this.dom = this.mapDOM(this.shadowRoot);
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }

  mapDOM(scope) {
    return {
      scope
    };
  }

  html() {
    return /*html*/ `
    <todos-header-container></todos-header-container>
    <todos-main-container></todos-main-container>
    <todos-footer-container></todos-footer-container>
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
