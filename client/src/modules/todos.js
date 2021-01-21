const ADD_TODO = 'todos/ADD_TODO';
const DELETE_TODO = 'todos/DELETE_TODO';
const TOGGLE_COMPLETED_TODO = 'todos/TOGGLE_COMPLETED_TODO';
const TOGGLE_COMPLETED_ALL_TODO = 'todos/TOGGLE_COMPLETED_ALL_TODO';
const CLEAR_COMPLETED_TODOS = 'todos/CLEAR_COMPLETED_TODOS';

const initialState = {
  data: []
};

export const addTodo = (id, content) => ({
  type: ADD_TODO,
  todo: {
    id,
    content,
    completed: false
  }
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id
});

export const toggleCompletedTodo = (id) => ({
  type: TOGGLE_COMPLETED_TODO,
  id
});

export const toggleCompletedAllTodo = (status) => ({
  type: TOGGLE_COMPLETED_ALL_TODO,
  status
});

export const clearCompletedTodos = () => ({
  type: CLEAR_COMPLETED_TODOS
});

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, data: [...state.data, action.todo] };
    case DELETE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== action.id)
      };
    case TOGGLE_COMPLETED_TODO:
      return {
        ...state,
        data: state.data.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case TOGGLE_COMPLETED_ALL_TODO:
      return {
        ...state,
        data: state.data.map((todo) => ({ ...todo, completed: action.status }))
      };
    case CLEAR_COMPLETED_TODOS:
      return {
        ...state,
        data: state.data.filter((todo) => !todo.completed)
      };
    default:
      return state;
  }
}
