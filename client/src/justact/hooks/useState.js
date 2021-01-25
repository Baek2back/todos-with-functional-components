import { JustactState } from '../justact';

export const useState = (initial) => {
  const oldHook =
    JustactState.workInProgressFiber.alternate &&
    JustactState.workInProgressFiber.alternate.hooks &&
    JustactState.workInProgressFiber.alternate.hooks[JustactState.hookIndex];

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
    JustactState.workInProgressRoot = {
      dom: JustactState.currentRoot && JustactState.currentRoot.dom,
      props: JustactState.currentRoot && JustactState.currentRoot.props,
      alternate: JustactState.currentRoot
    };
    JustactState.nextUnitOfWork = JustactState.workInProgressRoot;
    JustactState.deletions = [];
  };

  JustactState.workInProgressFiber.hooks.push(hook);
  JustactState.hookIndex++;

  return [hook.state, setState];
};
