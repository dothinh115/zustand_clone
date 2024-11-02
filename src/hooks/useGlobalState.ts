import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export const useGlobalState = (key: string, initialValue?: any) => {
  const getter = useStore((state) => state[key]);
  const setter = (newValue: any) => {
    useStore().getState().setState(key, newValue);
  };

  useEffect(() => {
    if (initialValue) {
      useStore().getState().setState(key, initialValue);
    }
  }, [key, initialValue]);
  return [getter, setter] as const;
};
