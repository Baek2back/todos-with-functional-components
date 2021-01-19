// eslint-disable-next-line no-unused-vars
import App from './App';
import Justact from './justact';
import './index.css';

import { createStore, applyMiddleware, provide } from './redux';
import rootReducer from './modules';
import { logger, thunk } from './middlewares';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
provide(store);

Justact.render(<App />, document.getElementById('root'));
