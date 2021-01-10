import Component from '../common/component.js';
import { createUUID } from '../common/utils.js';
import '../components/input.js';
import '../components/navigation.js';
import './todos-container.js';
import { add, setStatus } from '../store/modules/todo.js';
import store from '../store/index.js';

export default class MainContainer extends Component {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.render();
    this.dom = this.mapDOM(this.shadowRoot);

    this.unsubscribe = store.subscribe(
      ({ status }) => {
        this.dom.navigation.status = status;
      },
      ({ todo: { status } }) => ({ status })
    );

    this.shadowRoot.addEventListener('click', this.statusChangedHandler);
    this.shadowRoot.addEventListener('keyup', this.addTodoHandler);
  }

  statusChangedHandler(e) {
    const statusList = ['active', 'completed', 'all'];
    if (!statusList.includes(e.target.id)) return;
    store.dispatch(setStatus(e.target.id));
  }

  addTodoHandler(e) {
    const { target, key } = e;
    if (key !== 'Enter' || !target.value) return;
    store.dispatch(
      add({ id: createUUID(), content: target.value, completed: false })
    );
    target.value = '';
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }

  mapDOM(scope) {
    return {
      input: scope.querySelector('todos-input'),
      navigation: scope.querySelector('todos-navigation'),
      todosContainer: scope.querySelector('todos-todos-container')
    };
  }

  html() {
    return /*html*/ `
    <main>
      <todos-input></todos-input>
      <todos-navigation></todos-navigation>
      <todos-todos-container></todos-todos-container>
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
