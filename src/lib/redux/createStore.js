import { objectEquals } from '../../common/utils.js';

const createStore = (reducer, enhancer) => {
  if (enhancer) return enhancer(createStore)(reducer);

  let currentState = {
    todo: {
      status: 'all',
      todos: [
        {
          id: '527e66db-e7f1-49c5-b193-eaaa41b0a04b',
          content: 'HTML',
          completed: false
        },
        {
          id: '12b8d80a-42b7-4ae1-b48c-0f74a0acf043',
          content: 'CSS',
          completed: true
        },
        {
          id: 'f8fb86bd-1c0e-40e1-82ba-dffc1ff9a7ef',
          content: 'JS',
          completed: false
        }
      ]
    }
  };

  let isDispatching = false;
  let currentListeners = [];

  const getState = () => {
    return currentState;
  };

  const subscribe = (callback, config) => {
    currentListeners = [...currentListeners, { callback, config }];
    // return unsubscribe
    return () => {
      currentListeners = currentListeners.filter(
        (listener) => listener.callback !== callback
      );
    };
  };
  const dispatch = (action) => {
    if (isDispatching) throw new Error('on Dispatching...');
    if (typeof action.type === 'undefined')
      throw new Error('type must be defined');
    const prevState = { ...currentState };
    try {
      isDispatching = true;
      currentState = reducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    [...currentListeners].forEach(({ callback, config }) => {
      const prevValue = config(prevState);
      const currentValue = config(currentState);
      if (!objectEquals(prevValue, currentValue)) {
        callback(currentValue);
      }
    });
  };

  return {
    getState,
    subscribe,
    dispatch
  };
};

export default createStore;
