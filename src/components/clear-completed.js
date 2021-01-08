import Component from '../common/component.js';

export default class ClearCompleted extends Component {
  constructor() {
    super();
    this.innerHTML = this.render();
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }

  static get observedAttributes() {
    return ['total', 'complete'];
  }

  attributeChangedCallback(name) {
    switch (name) {
      case 'total':
      case 'complete':
        this.innerHTML = this.render();
        break;
      default:
        return;
    }
  }

  get remain() {
    return [this.getAttribute('total'), this.getAttribute('complete')];
  }
  set remain(val) {
    const { total, complete } = val;
    this.setAttribute('total', total);
    this.setAttribute('complete', complete);
  }

  html() {
    const [total, complete] = this.remain;
    return /*html*/ `
    <div class="clear-completed">
      <button class="btn">Clear completed (<span class="completed-todos">${complete}</span>)</button>
      <strong class="active-todos">${total}</strong> items left
    </div>
    `;
  }

  css() {
    return /*html*/ `
    <style>
      todos-clear-completed .clear-completed {
        position: relative;
        flex-basis: 50%;
        text-align: right;
        padding-right: 15px;
      }
      
      todos-clear-completed .btn {
        padding: 1px 5px;
        font-size: .8em;
        line-height: 1.5;
        border-radius: 3px;
        outline: none;
        color: #333;
        background-color: #fff;
        border-color: #ccc;
        cursor: pointer;
      }

      todos-clear-completed .btn:hover {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
      }
    </style>
    `;
  }
}

!customElements.get('todos-clear-completed') &&
  customElements.define('todos-clear-completed', ClearCompleted);
