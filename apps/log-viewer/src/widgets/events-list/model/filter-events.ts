import type { StreamEvent } from "@/shared/api/events/types";

export function filterEvents(events: StreamEvent[], query: string): StreamEvent[] {
	if (!query) return events;
	const q = query.toLowerCase();
	return events.filter(
		(e) =>
			e.parsed?.message?.toLowerCase().includes(q) ||
			e.parsed?.metadata?.namespace?.toLowerCase().includes(q) ||
			e.parsed?.reason?.toLowerCase().includes(q) ||
			`${e.parsed?.involvedObject?.kind ?? ""}/${e.parsed?.involvedObject?.name ?? ""}`
				.toLowerCase()
				.includes(q) ||
			e.parsed?.source?.component?.toLowerCase().includes(q) ||
			e.raw?.toLowerCase().includes(q),
	);
}
