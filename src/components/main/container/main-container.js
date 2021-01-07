import Component from '../../../common/component.js';
import '../presentationals/input.js';
import '../presentationals/navigation.js';
import '../presentationals/todo-list.js';

export default class MainContainer extends Component {
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
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"/>
    <main>
      <todos-input></todos-input>
      <todos-navigation></todos-navigation>
      <todos-todo-list></todos-todo-list>
    </main>
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

!customElements.get('todos-main-container') &&
  customElements.define('todos-main-container', MainContainer);
