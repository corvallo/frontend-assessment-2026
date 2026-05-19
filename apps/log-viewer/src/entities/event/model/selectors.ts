import type { StreamEvent } from "@/shared/api/events/types";
import type { EventStore } from "./types";

let _lastMap: Map<string, StreamEvent> | null = null;
let _lastList: StreamEvent[] = [];

export function selectEventList(state: EventStore): StreamEvent[] {
	if (state.events === _lastMap) return _lastList;
	_lastMap = state.events;
	_lastList = Array.from(state.events.values()).sort((a, b) => {
		const tA = a.parsed?.eventTime ?? new Date(a.receivedAt).toISOString();
		const tB = b.parsed?.eventTime ?? new Date(b.receivedAt).toISOString();
		return tA < tB ? -1 : tA > tB ? 1 : 0;
	});
	return _lastList;
}

export function malformedCount(state: EventStore): number {
	return Array.from(state.events.values()).filter((e) => e.malformed).length;
}
