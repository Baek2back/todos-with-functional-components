import { state } from '../index';

const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((aElement, aIdx) => aElement === b[aIdx])
  );
};

export function useEffect(callback, deps) {
  const oldHook =
    state.workInProgressFiber.alternate &&
    state.workInProgressFiber.alternate.hooks &&
    state.workInProgressFiber.alternate.hooks[state.hookIndex];

  const hook = {
    deps
  };

  if (!oldHook) {
    callback();
  } else {
    if (!arrayEquals(oldHook.deps, hook.deps)) {
      callback();
    }
  }

  state.workInProgressFiber.hooks.push(hook);
  state.hookIndex++;
}
