import { deepClone } from '../common/utils.js';
import todosModifiers from './todos.js';
import filtersModifiers from './filters.js';

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
};

const model = (initialState = INITIAL_STATE) => {
  return (prevState, event) => {
    if (!event) return deepClone(initialState);

    const { todos, currentFilter } = prevState;

    const newTodos = todosModifiers(todos, event);
    const newCurrentFilter = filtersModifiers(currentFilter, event);

    if (newTodos === todos && newCurrentFilter === currentFilter) {
      return prevState;
    }
    return {
      todos: newTodos,
      currentFilter: newCurrentFilter
    };
  };
};

export default model;
