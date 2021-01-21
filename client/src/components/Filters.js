// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
// eslint-disable-next-line no-unused-vars
import Filter from './Filter';
import styles from './Filters.module.css';

const Filters = ({ currentFilter, changeFilter }) => {
  const types = ['all', 'active', 'completed'];
  return (
    <ul className={styles.nav}>
      {types.map((type) => (
        <Filter
          type={type}
          isActive={currentFilter === type}
          changeFilter={changeFilter}
        />
      ))}
    </ul>
  );
};

export default Filters;
