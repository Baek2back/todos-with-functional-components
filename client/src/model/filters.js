const changeFilter = (state, event) => {
  return event.payload;
};

const modifiers = {
  FILTER_CHANGED: changeFilter
};

export default (prevState, event) => {
  if (!event) return 'All';

  const currentModifier = modifiers[event.type];

  return currentModifier ? currentModifier(prevState, event) : prevState;
};
