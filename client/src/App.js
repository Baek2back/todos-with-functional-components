// eslint-disable-next-line no-unused-vars
import Justact from './justact';
// eslint-disable-next-line no-unused-vars
import { Button, Checkbox, Counter, Filters, Todos, Input } from './components';
import styles from './App.module.css';

let init = false;

const App = ({ state, actions }) => {
  const { todos, filter } = state;
  const { data } = todos;
  const { currentFilter } = filter;

  const { todosActions, filterActions } = actions;
  const {
    addTodo,
    deleteTodo,
    toggleCompletedTodo,
    toggleCompletedAllTodo,
    clearCompletedTodos,
    fetchTodos
  } = todosActions;
  const { changeFilter } = filterActions;

  if (!init) {
    init = true;
    fetchTodos();
  }
  const { filteredList, completed } = ((condition, data) => {
    let filteredList = [];

    switch (condition) {
      case 'all':
        filteredList = data;
        return {
          filteredList,
          completed: filteredList.filter((todo) => todo.completed).length
        };
      case 'active':
        filteredList = data.filter((todo) => !todo.completed);
        return {
          filteredList,
          completed: data.length - filteredList.length
        };
      case 'completed':
        filteredList = data.filter((todo) => todo.completed);
        return {
          filteredList,
          completed: filteredList.length
        };
    }
  })(currentFilter, data);

  return (
    <section className={styles.App}>
      <header>
        <h1 className={styles.title}>Todos</h1>
        <div className={styles.ver}>with Functional Components</div>
      </header>
      <main>
        <Input addTodo={addTodo} />
        <Filters currentFilter={currentFilter} changeFilter={changeFilter} />
        <Todos
          list={filteredList}
          deleteTodo={deleteTodo}
          toggleCompletedTodo={toggleCompletedTodo}
        />
      </main>
      <footer>
        <Checkbox
          status={
            filteredList.length &&
            filteredList.length ===
              filteredList.filter((todo) => todo.completed).length
          }
          toggleCompletedAllTodo={toggleCompletedAllTodo}
        />
        <div className={styles.clear}>
          <Button count={completed} clearCompletedTodos={clearCompletedTodos} />
          <Counter count={filteredList.length} /> items left
        </div>
      </footer>
    </section>
  );
};

export default App;
