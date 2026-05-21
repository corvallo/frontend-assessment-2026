import { create } from "zustand";
import type { AutoScrollStore } from "./types";

export const useAutoScrollStore = create<AutoScrollStore>((set) => ({
	autoScroll: true,
	setAutoScroll: (autoScroll) => set({ autoScroll }),
}));
