import { create } from "zustand";

type FilterState = {
  filterQuery: string;
  setFilterQuery: (filterQuery: string) => void;
  sortType: string;
  setSortType: (sortType: string) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filterQuery: "",
  setFilterQuery: (filterQuery) => set({ filterQuery }),
  sortType: "",
  setSortType: (sortType) => set({ sortType }),
}));
