import { create } from "zustand";

type authorState = {
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
};

export const useAuthorStore = create<authorState>((set) => ({
  selectedAuthor: "",
  setSelectedAuthor: (author: string) =>
    set(() => ({ selectedAuthor: author })),
}));
