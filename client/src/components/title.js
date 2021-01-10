import Component from '../common/component.js';

export default class Title extends Component {
  constructor() {
    super();
    this.innerHTML = this.render();
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }

  html() {
    return /*html*/ `
    <h1 class="title">${this.title}</h1>
    <div class="ver">${this.ver}</div>
    `;
  }

  css() {
    return /*html*/ `
    <style>
      .title {
        font-size: 4.5em;
        font-weight: 100;
        text-align: center;
        color: #23b7e5;
      }
      .ver {
        font-weight: 100;
        text-align: center;
        color: #23b7e5;
        margin-bottom: 30px;
      }
    </style>
    `;
  }

  set title(value) {
    this.setAttribute('title', value);
  }
  get title() {
    return this.getAttribute('title');
  }

  set ver(value) {
    this.setAttribute('ver', value);
  }
  get ver() {
    return this.getAttribute('ver');
  }
}

!customElements.get('todos-title') &&
  customElements.define('todos-title', Title);
