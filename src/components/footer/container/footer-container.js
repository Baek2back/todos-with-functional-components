import Component from '../../../common/component.js';
import '../presentationals/complete-all.js';
import '../presentationals/clear-completed.js';

export default class FooterContainer extends Component {
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
    <footer>
      <todos-complete-all></todos-complete-all>
      <todos-clear-completed></todos-clear-completed>
    </footer>
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
      footer {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
      }
    </style>
    `;
  }
}

!customElements.get('todos-footer-container') &&
  customElements.define('todos-footer-container', FooterContainer);
