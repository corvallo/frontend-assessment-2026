import { create } from "zustand";
import type { SearchStore } from "./types";

export const useSearchStore = create<SearchStore>((set) => ({
	query: "",
	setQuery: (query) => set({ query }),
}));
