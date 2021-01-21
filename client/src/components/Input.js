// eslint-disable-next-line no-unused-vars
import Justact from '../justact';
import styles from './Input.module.css';

const Input = ({ addTodo }) => {
  const createUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const onChangeHandler = (e) => {
    const { value } = e.target;
    if (!value) return;
    e.target.value = '';
    addTodo(createUUID(), value);
  };
  return (
    <input
      className={styles.input}
      placeholder="What needs to be done?"
      autofocus
      onChange={onChangeHandler}
    />
  );
};

export default Input;
