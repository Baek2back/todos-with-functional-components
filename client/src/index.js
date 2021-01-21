// eslint-disable-next-line no-unused-vars
import { AppContainer } from './containers';
import Justact from './justact';
import './index.css';

import rootReducer from './modules';
import { createStore, applyMiddleware, provide } from './redux';
import { logger, thunk } from './middlewares';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
provide(store);

const wrappedRender = (Component, root) => () => {
  window.requestAnimationFrame(() => {
    Justact.render(<Component />, root);
  });
};

const root = document.getElementById('root');
const render = wrappedRender(AppContainer, root);

store.subscribe(render);

render();
