const isFragment = (type) => type === 'fragment';
const isText = (type) => type === 'TEXT_ELEMENT';
const isProperty = (key) => key !== 'children' && !isEvent(key);
const isEvent = (key) => key.startsWith('on');
const isNew = (prevProps, nextProps) => (key) =>
  prevProps[key] !== nextProps[key];
const isGone = (nextProps) => (key) => !Object.keys(nextProps).includes(key);
const getEventType = (name) => name.toLowerCase().substring(2);

/*
  fiber = {
    props,
    alternate,
    type,
    dom,
    effectTag,
    parent,
    child,
    sibling,
    hooks
  }
*/

const effectTags = Object.freeze({
  DELETION: 'DELETION',
  UPDATE: 'UPDATE',
  PLACEMENT: 'PLACEMENT'
});

const JustactState = {
  workInProgressRoot: null,
  currentRoot: null,
  deletions: null,
  workInProgressFiber: null,
  nextUnitOfWork: null,
  hookIndex: null
};

const createElement = (type, props, ...children) => {
  children = children.flat();
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'object' ? child : createTextElement(child);
      })
    }
  };
};

const createTextElement = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
};

const createDomNode = (fiber) => {
  const domNode = isFragment(fiber.type)
    ? document.createDocumentFragment()
    : isText(fiber.type)
    ? document.createTextNode(fiber.props.nodeValue)
    : document.createElement(fiber.type);
  updateDom(domNode, {}, fiber.props);
  return domNode;
};

const updateDom = (dom, prevProps, nextProps) => {
  // Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => isGone(nextProps)(key) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = getEventType(name);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach((name) => {
      dom[name] = '';
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = getEventType(name);
      dom.addEventListener(eventType, nextProps[name]);
    });
};

const render = (element, container) => {
  JustactState.workInProgressRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: JustactState.currentRoot
  };
  JustactState.deletions = [];
  JustactState.nextUnitOfWork = JustactState.workInProgressRoot;
};

const commitRoot = () => {
  JustactState.deletions.forEach(commitWork);
  if (JustactState.workInProgressRoot) {
    commitWork(JustactState.workInProgressRoot.child);
  }
  JustactState.currentRoot = JustactState.workInProgressRoot;
  JustactState.workInProgressRoot = null;
};

const commitWork = (fiber) => {
  if (!fiber) return;

  let domParentFiber = fiber.parent;

  while (!domParentFiber.dom || domParentFiber.type === 'fragment') {
    domParentFiber = domParentFiber.parent;
  }

  const domParent = domParentFiber.dom;

  if (fiber.effectTag === effectTags.PLACEMENT && fiber.dom) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === effectTags.UPDATE && fiber.dom) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === effectTags.DELETION) {
    commitDeletion(fiber, domParent);
    return;
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
};

const commitDeletion = (fiber, domParent) => {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
};

const performUnitOfWork = (fiber) => {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
};

const updateFunctionComponent = (fiber) => {
  JustactState.workInProgressFiber = fiber;
  JustactState.workInProgressFiber.hooks = [];
  JustactState.hookIndex = 0;

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
};

const updateHostComponent = (fiber) => {
  if (!fiber.dom) fiber.dom = createDomNode(fiber);

  reconcileChildren(fiber, fiber.props.children);
};

const reconcileChildren = (workInProgressFiber, elements) => {
  let oldFiber =
    workInProgressFiber.alternate && workInProgressFiber.alternate.child;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length || !!oldFiber) {
    const element = elements[index];
    let newFiber = null;
    const sameType = oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      // update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: workInProgressFiber,
        alternate: oldFiber,
        effectTag: effectTags.UPDATE
      };
    }

    if (element && !sameType) {
      // add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: workInProgressFiber,
        alternate: null,
        effectTag: effectTags.PLACEMENT
      };
    }

    if (oldFiber && !sameType) {
      // delete oldFiber's node
      oldFiber.effectTag = effectTags.DELETION;
      JustactState.deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      workInProgressFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
};

const workLoop = (deadline) => {
  let shouldYield = false;
  while (JustactState.nextUnitOfWork && !shouldYield) {
    JustactState.nextUnitOfWork = performUnitOfWork(
      JustactState.nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!JustactState.nextUnitOfWork && JustactState.workInProgressRoot) {
    commitRoot();
  }

  window.requestIdleCallback(workLoop);
};

window.requestIdleCallback(workLoop);

export { JustactState, createElement, render };
