import { deepFreeze } from '../common/utils.js';

const EVENT_TYPES = deepFreeze({
  TODO_ADDED: 'TODO_ADDED',
  TODO_DELETED: 'TODO_DELETED',
  TODO_COMPLETED_TOGGLED: 'TODO_COMPLETED_TOGGLED',
  TODOS_COMPLETED_TOGGLED_ALL: 'TODOS_COMPLETED_TOGGLED_ALL',
  COMPLETED_TODOS_DELETED: 'COMPLETED_TODOS_DELETED',
  FILTER_CHANGED: 'FILTER_CHANGED'
});

export default {
  addTodo: (content) => ({
    type: EVENT_TYPES.TODO_ADDED,
    payload: content
  }),
  deleteTodo: (id) => ({
    type: EVENT_TYPES.TODO_DELETED,
    payload: id
  }),
  toggleTodoCompleted: (id) => ({
    type: EVENT_TYPES.TODO_COMPLETED_TOGGLED,
    payload: id
  }),
  completedToggleAll: (status) => ({
    type: EVENT_TYPES.TODOS_COMPLETED_TOGGLED_ALL,
    payload: status
  }),
  clearCompleted: () => ({
    type: EVENT_TYPES.COMPLETED_TODOS_DELETED
  }),
  changeFilter: (filter) => ({
    type: EVENT_TYPES.FILTER_CHANGED,
    payload: filter
  })
};
