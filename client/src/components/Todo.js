// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import styles from './Todo.module.css';

const Todo = ({ id, content, completed, deleteTodo, toggleCompletedTodo }) => {
  const deleteTodoHandler = () => {
    deleteTodo(id);
  };
  const toggleCompletedTodoHandler = () => {
    toggleCompletedTodo(id);
  };
  return (
    <li id={id} className={styles.todo}>
      <input
        id={`ck-${id}`}
        type="checkbox"
        className={styles.checkbox}
        checked={completed}
      />
      <label for={`ck-${id}`} onClick={toggleCompletedTodoHandler}>
        {content}
      </label>
      <i className={`far fa-times-circle`} onClick={deleteTodoHandler}></i>
    </li>
  );
};
export default Todo;
