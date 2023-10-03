import { create } from "zustand";

type SelectedTabState = {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
};

export const useSelectedTabStore = create<SelectedTabState>((set) => ({
  selectedTab: "",
  setSelectedTab: (selectedTab: string) => set(() => ({ selectedTab })),
}));
