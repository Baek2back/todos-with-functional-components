import { compose } from '../../common/utils.js';

const applyMiddleware = (...middlewares) => (next) => (
  reducer,
  initialState
) => {
  const store = next(reducer, initialState);
  let dispatch = store.dispatch;
  const middlewareAPI = {
    getState: store.getState,
    dispatch: (action) => dispatch(action)
  };
  const chain = middlewares.map((middleware) => middleware(middlewareAPI));

  dispatch = compose(...chain, store.dispatch);

  return {
    ...store,
    dispatch
  };
};

export default applyMiddleware;
