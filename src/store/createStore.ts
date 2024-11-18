import { isEqual } from "lodash";
import { useEffect, useState } from "react";

export const createStore = <T = any>(
  initialValue: (set: (update: (state: T) => any) => void) => T
) => {
  let store: T = initialValue(set);
  const listeners = new Set<(oldStore: T, newStore: T) => void>();

  function set(update: (state: T) => any) {
    const newStore = update(store);
    const oldStore = store;
    store = {
      ...store,
      ...newStore,
    };
    listeners.forEach((listenner) => listenner(oldStore, newStore));
  }

  function subscribe(listener: (oldStore: T, newStore: T) => void) {
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
      const handleChange = (oldStore: T, newStore: T) => {
        const equal = isEqual(oldStore, newStore);
        if (!equal) {
          setSelectedState(selector(store));
        }
      };
      const unSubscribe = subscribe(handleChange);

      return unSubscribe;
    }, [selector]);

    return selector(store) ?? "";
  };

  return useStore;
};
