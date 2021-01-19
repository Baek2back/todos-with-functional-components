// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import styles from './Filters.module.css';

const Filters = () => {
  return (
    <ul className={styles.nav}>
      <li id="all" className={styles.active}>
        All
      </li>
      <li id="active">Active</li>
      <li id="completed">Completed</li>
    </ul>
  );
};

export default Filters;
