import Component from '../../../common/component.js';

export default class Navigation extends Component {
  connectedCallback() {
    this.innerHTML = this.render();
  }
  disconnectedCallback() {}
  render() {
    return `${this.html()}
            ${this.css()}`;
  }
  html() {
    return /*html*/ `
    <ul class="nav">
      <li id="all" class="active">All</li>
      <li id="active">Active</li>
      <li id="completed">Completed</li>
    </ul>
    `;
  }
  css() {
    return /*html*/ `
    <style>
      todos-navigation .nav {
        display: flex;
        margin: 15px;
        list-style: none;
      }

      todos-navigation .nav > li {
        padding: 4px 10px;
        border-radius: 4px;
        cursor: pointer;
      }

      todos-navigation .nav > li.active {
        color: #fff;
        background-color: #23b7e5;
      }
    </style>
    `;
  }
}

!customElements.get('todos-navigation') &&
  customElements.define('todos-navigation', Navigation);
