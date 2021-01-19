// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import styles from './Button.module.css';

const Buttons = (props) => {
  const { count } = props;
  return (
    <button className={styles.button}>
      Clear completed (<span>{`${count}`}</span>)
    </button>
  );
};

export default Buttons;
