import { useEventStore } from "@/entities/event";
import { STORE_MAX_EVENTS } from "@/entities/event/model/constants";
import { textStyle, wrapperStyle } from "./last-events.style";

export function LastEvents() {
	const isCapped = useEventStore((s) => s.events.size >= STORE_MAX_EVENTS);
	if (!isCapped) return null;
	return (
		<div className={wrapperStyle}>
			<span className={textStyle}>
				Showing last {STORE_MAX_EVENTS.toLocaleString()} events
			</span>
		</div>
	);
}
