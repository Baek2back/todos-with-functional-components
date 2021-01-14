import { applyCSS, createTemplate, dataAttrSelector } from '../common/utils.js';
import eventCreators from '../model/eventCreators.js';
import Todo from './Todo.js';

const html = /*html*/ `
  <ul class="todos"></ul>
`;

const template = createTemplate(html);

const todosSelector = dataAttrSelector('component', 'todos');

const css = /*css*/ `
  ${todosSelector} .todos {
    margin-top: 20px;
  }
`;

applyCSS(css);

const createNewTodoList = () => {
  return template.content.cloneNode(true);
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

const addEvents = (targetElement, dispatch) => {
  const deleteHandler = (e) => {
    if (!e.target.matches(`${todosSelector} .remove-todo`)) return;
    dispatch(eventCreators.deleteTodo(e.target.parentNode.id));
  };

  const toggleHandler = (e) => {
    if (!e.target.matches(`${todosSelector} input.checkbox`)) return;
    dispatch(eventCreators.toggleTodoCompleted(e.target.parentNode.id));
  };
  targetElement.addEventListener('click', deleteHandler);
  targetElement.addEventListener('click', toggleHandler);
};

const Todos = (targetElement, state, dispatch) => {
  const { todos, currentFilter } = state;
  const newTodosContainer = targetElement.cloneNode(true);
  newTodosContainer.innerHTML = '';
  const newTodos = createNewTodoList().querySelector('ul');
  const filteredTodos = filterTodos(todos, currentFilter);
  filteredTodos.map(Todo).forEach((element) => newTodos.appendChild(element));
  newTodosContainer.appendChild(newTodos);
  addEvents(newTodosContainer, dispatch);
  return newTodosContainer;
};

export default Todos;
