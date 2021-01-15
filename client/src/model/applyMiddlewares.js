export default function applyMiddlewares(...middlewareFactories) {
  return function enhancer(eventBus) {
    return function newEventBus(model) {
      const store = eventBus(model);
      let dispatch = store.dispatch;
      middlewareFactories.forEach((factory) => {
        dispatch = factory(store)(dispatch);
      });
      store.dispatch = dispatch;
      return store;
    };
  };
}
