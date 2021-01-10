import Component from '../common/component.js';

export default class CompleteAll extends Component {
  constructor() {
    super();
    this.innerHTML = this.render();
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }

  static get observedAttributes() {
    return ['checked'];
  }
  attributeChangedCallback() {
    this.innerHTML = this.render();
  }

  get checked() {
    return this.getAttribute('checked');
  }

  set checked(val) {
    this.setAttribute('checked', val);
  }

  html() {
    return /*html*/ `
    <div class="complete-all">
      <input class="checkbox" type="checkbox" id="ck-complete-all" ${
        this.checked === 'true' ? 'checked' : ''
      }/>
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
    </style>
    `;
  }
}

!customElements.get('todos-complete-all') &&
  customElements.define('todos-complete-all', CompleteAll);
