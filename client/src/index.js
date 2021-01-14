import App from './components/App.js';
import Todos from './components/Todos.js';
import Filters from './components/Filters.js';
import Counter from './components/Counter.js';

import applyDiff from './common/applyDiff.js';

import registry from './common/registry.js';

registry.addToRegistry('app', App);
registry.addToRegistry('todos', Todos);
registry.addToRegistry('filters', Filters);
registry.addToRegistry('counter', Counter);

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');
    const newMain = registry.renderRoot(main);
    applyDiff(document.body, main, newMain);
  });
};

render();
