import combineReducers from '../redux/combineReducers.js';
import filter from './filter.js';
import todos from './todos.js';

const rootReducer = combineReducers({
  filter,
  todos
});
export default rootReducer;
