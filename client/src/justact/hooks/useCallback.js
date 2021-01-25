import { useMemo } from './useMemo';

export const useCallback = (callback, deps) => {
  return useMemo(() => callback, deps);
};
