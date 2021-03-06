import { JustactState } from '../justact';
import { arraysEqual } from './utils';

export const useEffect = (callback, deps) => {
  const oldHook =
    JustactState.workInProgressFiber.alternate &&
    JustactState.workInProgressFiber.alternate.hooks &&
    JustactState.workInProgressFiber.alternate.hooks[JustactState.hookIndex];

  const hook = {
    deps
  };

  if (!(oldHook && arraysEqual(oldHook.deps, hook.deps))) {
    callback();
  }

  JustactState.workInProgressFiber.hooks.push(hook);
  JustactState.hookIndex++;
};
