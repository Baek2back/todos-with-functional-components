// eslint-disable-next-line no-unused-vars
import Justact from './justact';
// eslint-disable-next-line no-unused-vars
import { Button, Checkbox, Counter, Filters, Todos } from './components';

import styles from './App.module.css';
import { connect } from './redux';

const App = () => {
  return (
    <section className={styles.App}>
      <header>
        <h1 className={styles.title}>Todos</h1>
        <div className={styles.ver}>with Functional Components</div>
      </header>
      <main>
        <input
          className={styles.input}
          placeholder="What needs to be done?"
          autofocus
        />
        <Filters></Filters>
        <Todos></Todos>
      </main>
      <footer className={styles.footer}>
        <Checkbox></Checkbox>
        <div>
          <Button></Button>
          <Counter></Counter> items left
        </div>
      </footer>
    </section>
  );
};

export default connect()(App);
