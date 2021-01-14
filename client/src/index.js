import App from './components/App.js';
import Todos from './components/Todos.js';
import Filters from './components/Filters.js';
import Counter from './components/Counter.js';

import applyDiff from './common/applyDiff.js';

import registry from './common/registry.js';

import eventBusFactory from './model/eventBus.js';
import modelFactory from './model/model.js';

registry.addToRegistry('app', App);
registry.addToRegistry('todos', Todos);
registry.addToRegistry('filters', Filters);
registry.addToRegistry('counter', Counter);

const modifiers = modelFactory();
const eventBus = eventBusFactory(modifiers);

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');
    const newMain = registry.renderRoot(main, state, eventBus.dispatch);
    applyDiff(document.body, main, newMain);
  });
};

eventBus.subscribe(render);

render(eventBus.getState());
