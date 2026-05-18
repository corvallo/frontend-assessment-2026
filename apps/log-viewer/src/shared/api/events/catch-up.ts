import { parseEvent } from "./parse-event";
import type { StreamEvent } from "./types";

type EventsResponse = {
	events: string[];

	nextCursor: string | null;
};

export async function catchUpEvents(since: string): Promise<{
	events: StreamEvent[];

	nextCursor: string | null;
}> {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/events?since=${since}&limit=100`,
	);

	if (!response.ok) {
		throw new Error("Failed to catch up events");
	}

	const data = (await response.json()) as EventsResponse;

	return {
		events: data.events.map(parseEvent),

		nextCursor: data.nextCursor,
	};
}
