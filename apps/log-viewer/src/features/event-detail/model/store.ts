import { create } from "zustand";
import type { EventDetailStore } from "./types";

export const useEventDetailStore = create<EventDetailStore>((set) => {
	return {
		selectedEventId: null,
		selectEvent: (id) => set({ selectedEventId: id }),
		clear: () => set({ selectedEventId: null }),
	};
});
