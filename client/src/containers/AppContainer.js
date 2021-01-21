// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import { bindActionCreators, connect } from '../redux';
import App from '../App';
import * as todosActions from '../modules/todos';
import * as filterActions from '../modules/filter';

const mapStateToProps = (state) => {
  const { todos, filter } = state;
  return {
    todos,
    filter
  };
};
const mapDispatchToProps = (dispatch) => ({
  todosActions: bindActionCreators(todosActions, dispatch),
  filterActions: bindActionCreators(filterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
