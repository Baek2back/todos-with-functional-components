// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import styles from './Button.module.css';

const Buttons = ({ count, clearCompletedTodos }) => {
  const clearCompletedTodosHandler = () => {
    clearCompletedTodos();
  };
  return (
    <button className={styles.button} onClick={clearCompletedTodosHandler}>
      Clear completed (<span>{`${count}`}</span>)
    </button>
  );
};

export default Buttons;
