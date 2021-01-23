import * as todosAPI from '../lib/api/todos';

const typeMaker = (type) => [`${type}_SUCCESS`, `${type}_FAILURE`];
const url = '/api';

const FETCH_TODOS = 'FETCH_TODOS';
const [FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE] = typeMaker(FETCH_TODOS);

const ADD_TODO = 'ADD_TODO';
const [ADD_TODO_SUCCESS, ADD_TODO_FAILURE] = typeMaker(ADD_TODO);

const DELETE_TODO = 'DELETE_TODO';
const [DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE] = typeMaker(DELETE_TODO);

const TOGGLE_COMPLETED_TODO = 'TOGGLE_COMPLETED_TODO';
const [
  TOGGLE_COMPLETED_TODO_SUCCESS,
  TOGGLE_COMPLETED_TODO_FAILURE
] = typeMaker(TOGGLE_COMPLETED_TODO);

const TOGGLE_COMPLETED_ALL_TODO = 'TOGGLE_COMPLETED_ALL_TODO';
const [
  TOGGLE_COMPLETED_ALL_TODO_SUCCESS,
  TOGGLE_COMPLETED_ALL_TODO_FAILURE
] = typeMaker(TOGGLE_COMPLETED_ALL_TODO);

const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';
const [
  CLEAR_COMPLETED_TODOS_SUCCESS,
  CLEAR_COMPLETED_TODOS_FAILURE
] = typeMaker(CLEAR_COMPLETED_TODOS);

export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: FETCH_TODOS });
  try {
    const todos = await todosAPI.fetchTodos(url);
    dispatch({ type: FETCH_TODOS_SUCCESS, todos });
  } catch (e) {
    dispatch({ type: FETCH_TODOS_FAILURE, error: e });
  }
};

export const addTodo = (id, content) => async (dispatch) => {
  const todo = { id, content, completed: false };
  dispatch({ type: ADD_TODO });
  try {
    const newTodo = await todosAPI.addTodo(url, todo);
    console.log('newTodo', newTodo);
    dispatch({ type: ADD_TODO_SUCCESS, newTodo });
  } catch (e) {
    dispatch({ type: ADD_TODO_FAILURE, error: e });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  dispatch({ type: DELETE_TODO });
  try {
    await todosAPI.deleteTodo(url, id);
    dispatch({ type: DELETE_TODO_SUCCESS, id });
  } catch (e) {
    dispatch({ type: DELETE_TODO_FAILURE, error: e });
  }
};

export const toggleCompletedTodo = (id, completed) => async (dispatch) => {
  dispatch({ type: TOGGLE_COMPLETED_TODO });
  try {
    const changedTodo = await todosAPI.toggleCompletedTodo(url, id, completed);
    dispatch({ type: TOGGLE_COMPLETED_TODO_SUCCESS, id, changedTodo });
  } catch (e) {
    dispatch({ type: TOGGLE_COMPLETED_TODO_FAILURE, error: e });
  }
};

export const toggleCompletedAllTodo = (newStatus, todos) => async (
  dispatch
) => {
  dispatch({ type: TOGGLE_COMPLETED_ALL_TODO });
  try {
    const newTodos = await todosAPI.toggleCompletedAllTodo(
      url,
      newStatus,
      todos
    );
    dispatch({ type: TOGGLE_COMPLETED_ALL_TODO_SUCCESS, newTodos });
  } catch (e) {
    dispatch({ type: TOGGLE_COMPLETED_ALL_TODO_FAILURE, error: e });
  }
};

export const clearCompletedTodos = () => async (dispatch) => {
  dispatch({ type: CLEAR_COMPLETED_TODOS });
  try {
    const newTodos = await todosAPI.clearCompletedTodos(url);
    dispatch({ type: CLEAR_COMPLETED_TODOS_SUCCESS, newTodos });
  } catch (e) {
    dispatch({ type: CLEAR_COMPLETED_TODOS_FAILURE, error: e });
  }
};

const initialState = {
  loading: false,
  data: [],
  error: null
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.todos,
        error: null
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ADD_TODO:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.newTodo,
        error: null
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_TODO:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((todo) => todo.id !== action.id),
        error: null
      };
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case TOGGLE_COMPLETED_TODO:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TOGGLE_COMPLETED_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((todo) =>
          todo.id === action.id ? action.changedTodo : todo
        ),
        error: null
      };
    case TOGGLE_COMPLETED_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case TOGGLE_COMPLETED_ALL_TODO:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TOGGLE_COMPLETED_ALL_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.newTodos,
        error: null
      };
    case TOGGLE_COMPLETED_ALL_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case CLEAR_COMPLETED_TODOS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CLEAR_COMPLETED_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.newTodos
      };
    case CLEAR_COMPLETED_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
