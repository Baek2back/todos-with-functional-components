import Component from '../../../common/component.js';

export default class ClearCompleted extends Component {
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
    <div class="clear-completed">
      <button class="btn">Clear completed (<span class="completed-todos">0</span>)</button>
      <strong class="active-todos">0</strong> items left
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
