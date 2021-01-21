import { state } from '../index';

export function useState(initial) {
  const oldHook =
    state.workInProgressFiber.alternate &&
    state.workInProgressFiber.alternate.hooks &&
    state.workInProgressFiber.alternate.hooks[state.hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    state.workInProgressRoot = {
      dom: state.currentRoot && state.currentRoot.dom,
      props: state.currentRoot && state.currentRoot.props,
      alternate: state.currentRoot
    };
    state.nextUnitOfWork = state.workInProgressRoot;
    state.deletions = [];
  };

  state.workInProgressFiber.hooks.push(hook);
  state.hookIndex++;

  return [hook.state, setState];
}
