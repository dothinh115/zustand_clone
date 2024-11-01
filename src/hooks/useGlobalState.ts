import { useStore } from "@/store/useStore";

export const useGlobalState = (key: string, initialValue?: any) => {
  const state = useStore().getState();
  if (!state.hasOwnProperty(key)) {
    useStore().getState().setState(key, initialValue);
  }
  const getter = useStore((state) => state[key]);
  const setter = (newValue: any) => {
    useStore().getState().setState(key, newValue);
  };
  return [getter, setter] as const;
};
