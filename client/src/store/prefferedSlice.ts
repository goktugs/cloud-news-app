import { create } from "zustand";

type PreferredState = {
  preferredCategory: string;
  setPrefferedCategory: (preferredCategory: string) => void;
  prefferedSources: string[];
  setPrefferedSources: (prefferedSources: string[]) => void;
};

export const usePreferredStore = create<PreferredState>((set) => ({
  preferredCategory: "",
  setPrefferedCategory: (preferredCategory: string) =>
    set(() => ({ preferredCategory })),
  prefferedSources: [],
  setPrefferedSources: (prefferedSources: string[]) =>
    set(() => ({ prefferedSources })),
}));
