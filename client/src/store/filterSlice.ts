import { create } from "zustand";

type FilterState = {
  filterQuery: string;
  setFilterQuery: (filterQuery: string) => void;
  fromDate: string;
  setFromDate: (fromDate: string) => void;
  toDate: string;
  setToDate: (toDate: string) => void;
  selectedSource: string;
  setSelectedSource: (sources: string) => void;
  category: string;
  setCategory: (category: string) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filterQuery: "news",
  setFilterQuery: (filterQuery: string) => set(() => ({ filterQuery })),
  fromDate: "",
  setFromDate: (fromDate: string) => set(() => ({ fromDate })),
  toDate: "",
  setToDate: (toDate: string) => set(() => ({ toDate })),
  selectedSource: "",
  setSelectedSource: (selectedSource: string) =>
    set(() => ({ selectedSource })),
  category: "",
  setCategory: (category: string) => set(() => ({ category })),
}));
