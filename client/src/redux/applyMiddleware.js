export default function applyMiddleware(...middlewareFactories) {
  return function enhancer(createStore) {
    return function newCreateStore(reducer) {
      const store = createStore(reducer);
      let dispatch = store.dispatch;
      middlewareFactories.forEach((factory) => {
        dispatch = factory(store)(dispatch);
      });
      store.dispatch = dispatch;
      return store;
    };
  };
}
