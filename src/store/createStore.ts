import { useEffect, useState } from "react";

export const createStore = <T = any>(
  initialValue: (set: (update: (state: T) => any) => void) => T
) => {
  let store: T = initialValue(set);
  const listeners = new Set<() => void>();

  function set(update: (state: T) => any) {
    const newStore = update(store);
    store = {
      ...store,
      ...newStore,
    };
    Promise.resolve().then(() => {
      listeners.forEach((listenner) => listenner());
    });
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function getState(): T {
    return store;
  }

  const useStore = <S extends T>(
    selector?: (state: T) => any
  ): { getState: () => T } | any => {
    if (!selector) {
      return { getState };
    }
    const [selectedState, setSelectedState] = useState<S>(() =>
      selector(store)
    );

    useEffect(() => {
      const handleChange = () => setSelectedState(selector(store));

      const unSubscribe = subscribe(handleChange);

      return unSubscribe;
    }, [selector]);

    return selectedState;
  };

  return useStore;
};
