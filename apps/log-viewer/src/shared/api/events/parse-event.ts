import type { ParsedK8sEvent, StreamEvent } from "./types";

function isValidK8sEvent(val: unknown): val is ParsedK8sEvent {
	return (
		typeof val === "object" &&
		val !== null &&
		"kind" in val &&
		(val as ParsedK8sEvent).kind === "Event"
	);
}

export function parseEvent(raw: string): StreamEvent {
	try {
		const parsed = JSON.parse(raw);
		if (!isValidK8sEvent(parsed)) {
			return {
				id: crypto.randomUUID(),
				raw,
				malformed: true,
				receivedAt: Date.now(),
			};
		}
		return {
			id: parsed.id ?? crypto.randomUUID(),
			raw,
			parsed,
			malformed: false,
			receivedAt: Date.now(),
		};
	} catch {
		return {
			id: crypto.randomUUID(),
			raw,
			malformed: true,
			receivedAt: Date.now(),
		};
	}
}
