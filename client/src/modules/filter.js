const CHANGE_FILTER = 'filter/CHANGE_FILTER';

export const changeFilter = (filter) => ({
  type: CHANGE_FILTER,
  currentFilter: filter
});

const initialState = {
  currentFilter: 'all'
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        currentFilter: action.currentFilter
      };
    default:
      return state;
  }
}
