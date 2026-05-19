import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useRef } from "react";
import { selectEventList, useEventStore } from "@/entities/event";
import { useEventDetailStore } from "@/features/event-detail/model";
import { rowsWrapper } from "./event-list.style";
import { EventRow } from "./event-row";
import { MalformedRow } from "./malformed-row";

function RowsWrapper() {
	const parentRef = useRef<HTMLDivElement>(null);
	const events = useEventStore(selectEventList);
	const selectEventId = useEventDetailStore((s) => s.selectEvent);

	const virtualizer = useVirtualizer({
		count: events.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 100,
		enabled: true,
	});
	const handleSelect = useCallback(
		(id: string) => selectEventId(id),
		[selectEventId],
	);

	return (
		<div ref={parentRef} className={rowsWrapper}>
			<div
				style={{
					height: virtualizer.getTotalSize(),
					width: "100%",
					position: "relative",
				}}
			>
				{virtualizer.getVirtualItems().map(({ key, index, start }) => (
					<div
						key={key}
						data-index={index}
						ref={virtualizer.measureElement}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							transform: `translateY(${start}px)`,
						}}
					>
						{events[index].malformed ? (
							<MalformedRow event={events[index]} />
						) : (
							<EventRow event={events[index]} onSelect={handleSelect} />
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export { RowsWrapper };
