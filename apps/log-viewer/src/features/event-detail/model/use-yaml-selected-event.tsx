import { useMemo } from "react";
import { dump } from "js-yaml";
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
		return dump(selectedEvent.parsed);
	}, [selectedEvent]);
	return { yaml };
}
