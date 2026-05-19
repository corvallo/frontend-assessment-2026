import { create } from "zustand";
import { STORE_MAX_EVENTS } from "./constants";
import {
	ConnectionState,
	type ConnectionStore,
	type EventStore,
} from "./types";

export const useEventStore = create<EventStore>((set) => ({
	events: new Map(),
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
}));

export const useConnectionStore = create<ConnectionStore>((set) => ({
	connectionState: ConnectionState.connecting,
	reconnectCount: 0,
	setConnectionState: (connectionState) => set({ connectionState }),
	incrementReconnectCount: () =>
		set((s) => ({ reconnectCount: s.reconnectCount + 1 })),
}));
