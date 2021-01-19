const CHANGE_FILTER = 'filter/CHANGE_FILTER';

export const changeFilter = (filter) => ({
  type: CHANGE_FILTER,
  currentFilter: filter
});

const initialState = {
  currentFilter: 'All'
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        currentFilter: action.filter
      };
    default:
      return state;
  }
}
