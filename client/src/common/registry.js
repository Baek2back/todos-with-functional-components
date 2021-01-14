const registry = {};

// TODO: HOC와 일반 컴포넌트로 분리하기.
const renderWrapper = (component) => {
  return (targetElement) => {
    const element = component(targetElement);

    const childComponents = element.querySelectorAll('[data-component]');

    [...childComponents].forEach((target) => {
      const name = target.dataset.component;
      const child = registry[name];
      if (!child) return;
      target.replaceWith(child(target));
    });

    return element;
  };
};

const addToRegistry = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root) => {
  const cloneComponent = (root) => root.cloneNode(true);
  return renderWrapper(cloneComponent)(root);
};

export default {
  addToRegistry,
  renderRoot
};
