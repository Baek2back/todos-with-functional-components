import { createUUID } from '../common/utils.js';

const addTodo = (state, event) => {
  const content = event.payload;
  if (!content) return state;
  return [...state, { id: createUUID(), content, completed: false }];
};

const deleteTodo = (state, event) => {
  const id = event.payload;
  return state.filter((todo) => todo.id !== id);
};

const toggleTodoCompleted = (state, event) => {
  const id = event.payload;
  return state.map((todo) => {
    return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
  });
};

const completedToggleAll = (state, event) => {
  const status = event.payload;
  return state.map((todo) => ({ ...todo, completed: status }));
};

const clearCompleted = (state) => {
  return state.filter((todo) => !todo.completed);
};

const modifiers = {
  TODO_ADDED: addTodo,
  TODO_DELETED: deleteTodo,
  TODO_COMPLETED_TOGGLED: toggleTodoCompleted,
  TODOS_COMPLETED_TOGGLED_ALL: completedToggleAll,
  COMPLETED_TODOS_DELETED: clearCompleted
};

export default (prevState, event) => {
  if (!event) return [];
  const currentModifiers = modifiers[event.type];

  return currentModifiers ? currentModifiers(prevState, event) : prevState;
};
