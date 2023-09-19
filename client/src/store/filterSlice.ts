import { create } from "zustand";

type FilterState = {
  filterQuery: string;
  setFilterQuery: (filterQuery: string) => void;
  startDate: string;
  setStartDate: (startDate: string) => void;
  endDate: string;
  setEndDate: (endDate: string) => void;
  sources: string;
  setSources: (sources: string) => void;
  category: string;
  setCategory: (category: string) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filterQuery: "news",
  setFilterQuery: (filterQuery: string) => set(() => ({ filterQuery })),
  startDate: "",
  setStartDate: (startDate: string) => set(() => ({ startDate })),
  endDate: "",
  setEndDate: (endDate: string) => set(() => ({ endDate })),
  sources: "",
  setSources: (sources: string) => set(() => ({ sources })),
  category: "",
  setCategory: (category: string) => set(() => ({ category })),
}));
