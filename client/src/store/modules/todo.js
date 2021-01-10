const ADD = 'todo/ADD';
const REMOVE = 'todo/REMOVE';
const TOGGLE = 'todo/TOGGLE';
const TOGGLE_ALL = 'todo/TOGGLE_ALL';
const SET_STATUS = 'todo/SET_STATUS';

export const add = (payload) => ({ type: ADD, payload });
export const remove = (payload) => ({ type: REMOVE, payload });
export const toggle = (payload) => ({ type: TOGGLE, payload });
export const toggleAll = (payload) => ({ type: TOGGLE_ALL, payload });
export const setStatus = (payload) => ({ type: SET_STATUS, payload });

const initialState = {
  status: 'all',
  todos: [
    {
      id: '527e66db-e7f1-49c5-b193-eaaa41b0a04b',
      content: 'HTML',
      completed: false
    },
    {
      id: '12b8d80a-42b7-4ae1-b48c-0f74a0acf043',
      content: 'CSS',
      completed: true
    },
    {
      id: 'f8fb86bd-1c0e-40e1-82ba-dffc1ff9a7ef',
      content: 'JS',
      completed: false
    }
  ]
};

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD:
      return { ...state, todos: [...state.todos, payload] };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== payload)
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case TOGGLE_ALL:
      return { ...state };
    case SET_STATUS:
      return { ...state, status: payload };
    default:
      return state;
  }
};

export default reducer;
