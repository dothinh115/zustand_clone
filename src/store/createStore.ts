import { isEqual } from "lodash";
import { useEffect, useState } from "react";

export const createStore = <T = any>(
  initialValue: (set: (update: (state: T) => any) => void) => T
) => {
  let store: T = initialValue(set);
  const listeners = new Map<string, (() => void)[]>();

  function set(update: (state: T) => any) {
    const oldStore = { ...store };
    const newStore = update(store);
    store = {
      ...store,
      ...newStore,
    };
    for (const key in store) {
      if (!isEqual(oldStore[key], store[key])) {
        const executeSetState = listeners.get(key);
        if (executeSetState) {
          executeSetState.forEach((func) => func());
        }
      }
    }
  }

  function subscribe(key: string, listener: () => void) {
    if (!listeners.has(key)) {
      listeners.set(key, []);
    }
    listeners.get(key)?.push(listener);
    return () => {
      const executeFuncArr = listeners.get(key);
      if (executeFuncArr) {
        listeners.set(
          key,
          executeFuncArr.filter((func) => func !== listener)
        );
        if (executeFuncArr.length === 1) {
          listeners.delete(key);
        }
      }
    };
  }

  function findKeyByValue(selector: (state: T) => any) {
    const find = Object.entries(store as any).find(([key, value]) =>
      isEqual(value, selector(store))
    );
    if (find) {
      const [key] = find;
      return key;
    }
  }

  function getState(): T {
    return store;
  }

  const useStore = <S extends T>(
    selector?: (state: T) => any
  ): { getState: () => T } | S => {
    if (!selector) {
      return { getState };
    }
    const [selectedState, setSelectedState] = useState<S>(() =>
      selector(store)
    );

    useEffect(() => {
      const key = findKeyByValue(selector);
      const handleChange = () => setSelectedState(selector(store));
      const unSubscribe = subscribe(key as string, handleChange);

      return unSubscribe;
    }, [selector]);

    return selectedState;
  };

  return useStore;
};
