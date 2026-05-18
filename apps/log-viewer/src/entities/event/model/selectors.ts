import type { EventStore } from "./types";

export const selectEventList = (state: EventStore) =>
	Array.from(state.events.values()).sort((a, b) => {
		const aTime = a.parsed?.eventTime ?? String(a.receivedAt);
		const bTime = b.parsed?.eventTime ?? String(b.receivedAt);
		return aTime.localeCompare(bTime);
	});
