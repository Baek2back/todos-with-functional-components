import { JustactState } from '../justact';
import { arraysEqual } from './utils';

export const useMemo = (compute, deps) => {
  const oldHook =
    JustactState.workInProgressFiber.alternate &&
    JustactState.workInProgressFiber.hooks &&
    JustactState.workInProgressFiber.alternate.hooks[JustactState.hookIndex];

  const hook = {
    value: null,
    deps
  };

  if (oldHook) {
    if (arraysEqual(oldHook.deps, hook.deps)) {
      hook.value = oldHook.value;
    } else {
      hook.value = compute();
    }
  } else {
    hook.value = compute();
  }
  JustactState.workInProgressFiber.hooks.push(hook);
  JustactState.hookIndex++;

  return hook.value;
};
