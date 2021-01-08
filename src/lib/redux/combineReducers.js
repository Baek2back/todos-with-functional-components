import { mapValues } from '../../common/utils.js';

const combineReducers = (reducers) => (state = {}, action) => {
  return mapValues(reducers, (reducer, key) => reducer(state[key], action));
};

export default combineReducers;
