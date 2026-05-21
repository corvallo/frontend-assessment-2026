import { useMemo } from "react";
import { useEventStore } from "@/entities/event";
import { useEventDetailStore } from "./store";

export function useEventDetailTitle() {
	const selectedEventId = useEventDetailStore((s) => s.selectedEventId);
	const event = useEventStore((s) =>
		selectedEventId ? s.events.get(selectedEventId) : undefined,
	);
	return useMemo(() => {
		if (!event) return "";
		if (event.malformed) return "Malformed Event";
		return `${event.parsed?.involvedObject?.kind ?? ""}/${event.parsed?.involvedObject?.name ?? ""}`;
	}, [event]);
}
