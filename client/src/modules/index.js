import combineReducers from '../redux/combineReducers';
import filter from './filter';
import todosAsync from './todosAsync';

const rootReducer = combineReducers({
  filter,
  todos: todosAsync
});
export default rootReducer;
