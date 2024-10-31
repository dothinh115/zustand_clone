import { createStore } from "./createStore";

type TStore = {
  [key: string]: any;
  setState: (key: string, value: any) => void;
};

export const useStore = createStore<TStore>((set) => ({
  setState: (key: string, value: any) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
}));
