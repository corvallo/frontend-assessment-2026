import { create } from "zustand";
import { STORE_MAX_EVENTS } from "./constants";
import { ConnectionState, type EventStore } from "./types";

export const useEventStore = create<EventStore>((set) => ({
	events: new Map(),
	connectionState: ConnectionState.connecting,
	appendEvents: (incoming) =>
		set((state) => {
			const next = new Map([
				...state.events,
				...incoming.map((evt) => [evt.id, evt] as const),
			]);

			if (next.size > STORE_MAX_EVENTS) {
				return {
					events: new Map(Array.from(next.entries()).slice(-STORE_MAX_EVENTS)),
				};
			}
			return { events: next };
		}),
	setConnectionState: (connectionState) => set({ connectionState }),
}));
