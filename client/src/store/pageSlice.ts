import { create } from "zustand";

type pageState = {
  page: number;
  setPageSlice: (page: number) => void;
};

export const usePageStore = create<pageState>((set) => ({
  page: 1,
  setPageSlice: (page: number) => set(() => ({ page })),
}));
