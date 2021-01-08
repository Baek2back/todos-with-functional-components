import Component from '../common/component.js';
import '../components/todo-list.js';
import '../components/complete-all.js';
import '../components/clear-completed.js';
import { toggle, remove } from '../store/modules/todo.js';
import store from '../store/index.js';

export default class TodosContainer extends Component {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.render();
    this.dom = this.mapDOM(this.shadowRoot);
    this.unsubscribe = store.subscribe(
      ({ todos, status }) => {
        this.todos = this.filteredTodosByStatus(status)(todos);
        this.dom.todoList.list = this.todos;
        const total = this.todos.length;
        const complete = this.todos.filter(({ completed }) => completed).length;
        this.dom.clearCompleted.remain = { total, complete };
        this.dom.completeAll.checked = total && total === complete;
      },
      ({ todo: { todos, status } }) => ({ todos, status })
    );
    this.shadowRoot.addEventListener('click', this.removeTodoHandler);
    this.shadowRoot.addEventListener(
      'click',
      this.clearCompletedTodosHandler.bind(this)
    );
    this.shadowRoot.addEventListener('change', this.toggleTodoHandler);
    this.shadowRoot.addEventListener(
      'change',
      this.toggleAllTodoHandler.bind(this)
    );
  }

  removeTodoHandler(e) {
    if (!e.target.matches('.remove-todo')) return;
    store.dispatch(remove(e.target.parentNode.id));
  }

  toggleTodoHandler(e) {
    if (!e.target.matches('.todo-item > input')) return;
    store.dispatch(toggle(e.target.parentNode.id));
  }

  toggleAllTodoHandler(e) {
    if (!e.target.matches('.complete-all > .checkbox')) return;
    this.todos.forEach((todo) => {
      const { id, completed } = todo;
      if (completed !== e.target.checked) store.dispatch(toggle(id));
    });
  }

  clearCompletedTodosHandler(e) {
    if (!e.target.matches('.btn')) return;
    this.todos.forEach((todo) => {
      const { id, completed } = todo;
      if (completed) store.dispatch(remove(id));
    });
  }

  filteredTodosByStatus(status) {
    return (todos) => {
      switch (status) {
        case 'all':
          return todos;
        case 'active':
          return todos.filter(({ completed }) => !completed);
        case 'completed':
          return todos.filter(({ completed }) => completed);
        default:
          return todos;
      }
    };
  }

  mapDOM(scope) {
    return {
      todoList: scope.querySelector('todos-todo-list'),
      completeAll: scope.querySelector('todos-complete-all'),
      clearCompleted: scope.querySelector('todos-clear-completed')
    };
  }

  render() {
    return `${this.html()}
            ${this.css()}`;
  }

  html() {
    return /*html*/ `
    <todos-todo-list></todos-todo-list>
    <footer>
      <todos-complete-all></todos-complete-all>
      <todos-clear-completed></todos-clear-completed>
    </footer>
    `;
  }

  css() {
    return /*html*/ `
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"/>
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
      .checkbox {
        display: none;
      }

      .checkbox + label {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translate3d(0, -50%, 0);
        display: inline-block;
        width: 90%;
        line-height: 2em;
        padding-left: 35px;
        cursor: pointer;
        user-select: none;
      }

      .checkbox + label:before {
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

      .checkbox:checked + label:after {
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

!customElements.get('todos-todos-container') &&
  customElements.define('todos-todos-container', TodosContainer);
