import Component from '../../../common/component.js';
import '../presentationals/title.js';

export default class HeaderContainer extends Component {
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
    <header>
      <todos-title title="Todos" ver="with Web Components"></todos-title>
    </header>
    `;
  }

  css() {
    return /*html*/ `
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
    </style>
    `;
  }
}

!customElements.get('todos-header-container') &&
  customElements.define('todos-header-container', HeaderContainer);
