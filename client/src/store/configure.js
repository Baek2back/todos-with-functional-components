import { createStore, applyMiddleware } from '../lib/redux/index.js';
import { thunk, logger } from '../lib/middlewares/index.js';
import rootReducer from './modules/index.js';

const configure = () =>
  createStore(rootReducer, applyMiddleware(thunk, logger));

export default configure;
