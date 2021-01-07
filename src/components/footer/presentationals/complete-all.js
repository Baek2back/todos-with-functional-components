import Component from '../../../common/component.js';

export default class CompleteAll extends Component {
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
    <div class="complete-all">
      <input class="checkbox" type="checkbox" id="ck-complete-all" />
      <label for="ck-complete-all">Mark all as complete</label>
    </div>
    `;
  }

  css() {
    return /*html*/ `
    <style>
      todos-complete-all .complete-all {
        position: relative;
        flex-basis: 50%;
        width: 360px;
        height: 23px;
      }

      todos-complete-all .checkbox {
        display: none;
      }

      todos-complete-all .checkbox + label {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translate3d(0, -50%, 0);
        display: inline-block;
        width: 90%;
        line-height: 1em;
        padding-left: 35px;
        cursor: pointer;
        user-select: none;
      }

      todos-complete-all .checkbox + label:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate3d(0, -50%, 0);
        width: 20px;
        height: 20px;
        background-color: #fff;
        border: 1px solid #cfdadd;
      }

      todos-complete-all .checkbox:checked + label:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 6px;
        transform: translate3d(0, -50%, 0);
        width: 10px;
        height: 10px;
        background-color: #23b7e5;
      }
    </style>
    `;
  }
}

!customElements.get('todos-complete-all') &&
  customElements.define('todos-complete-all', CompleteAll);
