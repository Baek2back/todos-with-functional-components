export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    const newState = {};

    // TODO: Implement using reduce and Object.keys method
    for (const key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}
