const logger = ({ getState }) => (next) => (action) => {
  console.log('Action Type: ', action.type);
  const prevState = getState();
  console.log('Prev: ', prevState);

  const returnValue = next(action);

  const nextState = getState();
  console.log('Next: ', nextState);
  return returnValue;
};

export default logger;
