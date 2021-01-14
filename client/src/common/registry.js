const registry = {};

// TODO: HOC와 일반 컴포넌트로 분리하기.
const renderWrapper = (component) => {
  return (targetElement, state, dispatch) => {
    const element = component(targetElement, state, dispatch);

    const childComponents = element.querySelectorAll('[data-component]');

    [...childComponents].forEach((target) => {
      const name = target.dataset.component;
      const child = registry[name];
      if (!child) return;
      target.replaceWith(child(target, state, dispatch));
    });

    return element;
  };
};

const addToRegistry = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state, events) => {
  const cloneComponent = (root) => root.cloneNode(true);
  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  addToRegistry,
  renderRoot
};
