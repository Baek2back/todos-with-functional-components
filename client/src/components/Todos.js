// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
// eslint-disable-next-line no-unused-vars
import Todo from './Todo';
import styles from './Todos.module.css';

const Todos = ({ list: todos, deleteTodo, toggleCompletedTodo }) => {
  return (
    <ul className={styles.todos}>
      {todos.map((todo) => {
        const { id, content, completed } = todo;
        return (
          <Todo
            id={id}
            content={content}
            completed={completed}
            deleteTodo={deleteTodo}
            toggleCompletedTodo={toggleCompletedTodo}
          />
        );
      })}
    </ul>
  );
};

export default Todos;
