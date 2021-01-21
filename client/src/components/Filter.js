// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import styles from './Filter.module.css';

const Filter = ({ type, isActive, changeFilter }) => {
  return (
    <li
      id={type}
      className={`${styles.filter} ${isActive ? styles.active : ''}`}
      onClick={() => changeFilter(type)}
    >
      {type}
    </li>
  );
};

export default Filter;
