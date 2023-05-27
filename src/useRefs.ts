import * as React from 'react';

export default function useRefs<T>(): [
  getRef: (index: number) => T,
  setRef: (index: number) => (instance: T) => void,
] {
  const nodeRef = React.useRef<Record<number, T>>({});

  function getRef(index: number) {
    return nodeRef.current[index];
  }

  function setRef(index: number) {
    return (node: T) => {
      nodeRef.current[index] = node;
    };
  }

  return [getRef, setRef];
}
