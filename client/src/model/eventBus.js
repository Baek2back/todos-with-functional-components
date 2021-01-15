import { deepClone, deepFreeze } from '../common/utils.js';

// model === combinedReducer
const eventBus = (model, enhancer) => {
  if (typeof enhancer === 'function') {
    return enhancer(eventBus)(model);
  }
  let state = model();
  let listeners = [];

  const subscribe = (newListener) => {
    listeners = [...listeners, newListener];
    return function unsubscribe() {
      listeners = listeners.filter((listner) => listner !== newListener);
    };
  };

  const invokeAllSubscribers = () => {
    const newState = deepFreeze(state);
    listeners.forEach((listener) => listener(newState));
  };

  const dispatch = (event) => {
    const newState = model(state, event);
    if (!newState) throw new Error('modle should always return newState');
    if (newState === state) return;
    state = newState;
    invokeAllSubscribers();
  };

  return {
    subscribe,
    dispatch,
    getState: () => deepFreeze(deepClone(state))
  };
};

export default eventBus;
