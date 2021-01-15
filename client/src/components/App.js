import { applyCSS, createTemplate } from '../common/utils.js';
import eventCreators from '../model/eventCreators.js';
import {
  appSelector,
  checkboxSelector,
  buttonSelector
} from '../common/selectors.js';
import Checkbox from './Checkbox.js';
import Button from './Button.js';

const html = /*html*/ `
  <header>
    <h1 class="title">Todos</h1>
    <div class="ver">with Functional Components</div>
  </header>
  <main>
    <input class="input-todo" placeholder="What needs to be done?" autofocus />
    <section data-component="filters"></section>
    <section data-component="todos"></section>
  </main>
  <footer>
    <section data-component="checkbox"></section>
    <div class="clear-completed">
      <section data-component="button"></section>
      <section data-component="counter"></section> items left
    </div>
  </footer>
`;

const template = createTemplate(html);

const css = /*css*/ `
  ${appSelector} {
    max-width: 750px;
    min-width: 450px;
    margin: 0 auto;
    padding: 15px;
  }

  ${appSelector} .title {
    /* margin: 10px 0; */
    font-size: 4.5em;
    font-weight: 100;
    text-align: center;
    color: #23b7e5;
  }

  ${appSelector} .ver {
    font-weight: 100;
    text-align: center;
    color: #23b7e5;
    margin-bottom: 30px;
  }

  ${appSelector} .input-todo {
    display: block;
    width: 100%;
    height: 45px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    color: #555;
    border: 1px solid #ccc;
    border-color: #e7ecee;
    border-radius: 6px;
    outline: none;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  ${appSelector} .input-todo:focus {
    border-color: #23b7e5;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }

  ${appSelector} .input-todo::-webkit-input-placeholder {
    color: #999;
  }

  ${appSelector} footer {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
  
  ${appSelector} .clear-completed {
    text-align: right;
    padding-right: 15px;
  }
`;

applyCSS(css);

const addEvents = (targetElement, dispatch) => {
  const addHandler = (e) => {
    if (e.key === 'Enter') {
      dispatch(eventCreators.addTodo(e.target.value));
      e.target.value = '';
    }
  };
  const toggleCompletedAllHandler = (e) => {
    dispatch(eventCreators.completedToggleAll(e.target.checked));
  };

  const clearCompletedHandler = () => {
    dispatch(eventCreators.clearCompleted());
  };

  targetElement
    .querySelector(`${appSelector} .input-todo`)
    .addEventListener('keydown', addHandler);

  targetElement
    .querySelector(`${checkboxSelector} input`)
    .addEventListener('click', toggleCompletedAllHandler);

  targetElement
    .querySelector(`${buttonSelector} button`)
    .addEventListener('click', clearCompletedHandler);
};

const filterTodos = (todos, filter) => {
  const isCompleted = (todo) => todo.completed;
  switch (filter) {
    case 'Active':
      return todos.filter((todo) => !isCompleted(todo));
    case 'Completed':
      return todos.filter(isCompleted);
    default:
      return [...todos];
  }
};

const App = (targetElement, state, dispatch) => {
  const { todos, currentFilter } = state;

  // TODO: Todos와 중복 로직 처리하기
  const currentTodos = filterTodos(todos, currentFilter);

  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = '';
  newApp.appendChild(template.content.cloneNode(true));

  newApp
    .querySelector(`${checkboxSelector}`)
    .appendChild(Checkbox({ currentTodos }));
  newApp
    .querySelector(`${buttonSelector}`)
    .appendChild(Button({ currentTodos }));
  addEvents(newApp, dispatch);
  return newApp;
};

export default App;
