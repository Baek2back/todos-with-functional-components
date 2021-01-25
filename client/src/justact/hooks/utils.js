export const arraysEqual = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((aElement, aIdx) => aElement === b[aIdx])
  );
};
