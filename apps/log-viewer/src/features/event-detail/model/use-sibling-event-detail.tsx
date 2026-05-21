import { useShallow } from "zustand/react/shallow";
import { useEventStore } from "@/entities/event";
import { useEventDetailStore } from "./store";

export function useSiblingEventDetail() {
	const selectedEventId = useEventDetailStore((s) => s.selectedEventId);
	const selectedEvent = useEventStore((s) =>
		selectedEventId ? s.events.get(selectedEventId) : undefined,
	);
	const uid = selectedEvent?.parsed?.involvedObject?.uid;

	const siblings = useEventStore(
		useShallow((s) => {
			if (!uid) return [];
			return Array.from(s.events.values())
				.filter((e) => e.parsed?.involvedObject?.uid === uid)
				.sort((a, b) => {
					const tA =
						a.parsed?.eventTime ?? new Date(a.receivedAt).toISOString();
					const tB =
						b.parsed?.eventTime ?? new Date(b.receivedAt).toISOString();
					return tA < tB ? -1 : tA > tB ? 1 : 0;
				});
		}),
	);

	const idx = siblings.findIndex((e) => e.id === selectedEventId);
	return {
		prevId: idx > 0 ? siblings[idx - 1].id : null,
		nextId: idx < siblings.length - 1 ? siblings[idx + 1].id : null,
		siblingIndex: idx + 1,
		siblingCount: siblings.length,
	};
}
