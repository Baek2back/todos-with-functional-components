// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import styles from './Checkbox.module.css';

const Checkbox = ({ status, toggleCompletedAllTodo }) => {
  const toggleCompletedAllTodoHandler = () => {
    toggleCompletedAllTodo(!status);
  };

  return (
    <div className={styles['complete-all']}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id="ck-complete-all"
        checked={status}
        onChange={toggleCompletedAllTodoHandler}
      />
      <label htmlFor="ck-complete-all">Mark all as complete</label>
    </div>
  );
};

export default Checkbox;
