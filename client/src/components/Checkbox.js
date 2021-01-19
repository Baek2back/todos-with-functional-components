// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import styles from './Checkbox.module.css';

const Checkbox = () => {
  return (
    <div className={styles['complete-all']}>
      <input className={styles.checkbox} type="checkbox" id="ck-complete-all" />
      <label htmlFor="ck-complete-all">Mark all as complete</label>
    </div>
  );
};

export default Checkbox;
