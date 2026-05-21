import { useMemo } from "react";
import { stringify } from "yaml";
import { useEventStore } from "@/entities/event";
import { useEventDetailStore } from "./store";

export function useYamlSelectedEvent() {
	const selectedEventId = useEventDetailStore((s) => s.selectedEventId);
	const selectedEvent = useEventStore((s) =>
		selectedEventId ? s.events.get(selectedEventId) : undefined,
	);
	const yaml = useMemo(() => {
		if (!selectedEvent) return "";
		if (selectedEvent.malformed) return selectedEvent.raw;
		return stringify(selectedEvent.parsed);
	}, [selectedEvent]);
	return { yaml };
}
