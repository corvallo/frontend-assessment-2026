import { memo } from "react";
import { EventLevelBadge } from "@/entities/event";
import type { StreamEvent } from "@/shared/api/events/types";
import { formatTime } from "@/shared/lib/format-time";

type EventRowProps = {
	event: StreamEvent;
	onSelect: (id: string) => void;
};
function EventRowCmp({ event, onSelect }: EventRowProps) {
	const parsed = event.parsed;
	return (
		<button
			type="button"
			onClick={() => onSelect(event.id)}
			className="grid grid-cols-[120px_90px_1fr_1fr_1fr_2fr_1fr] items-center gap-4 px-4 py-2 border-b border-border text-xs hover:bg-muted/30 w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			<span className="font-mono truncate text-muted-foreground">
				{formatTime(parsed?.eventTime)}
			</span>
			<EventLevelBadge type={parsed?.type} />
			<span className="truncate">{parsed?.metadata?.namespace ?? "—"}</span>
			<span className="truncate">{parsed?.reason ?? "—"}</span>
			<span className="truncate font-mono">
				{parsed?.involvedObject?.kind ? `${parsed.involvedObject.kind}/` : ""}
				{parsed?.involvedObject?.name ?? "—"}
			</span>
			<span className="truncate text-muted-foreground">
				{parsed?.message ?? "—"}
			</span>
			<span className="truncate text-muted-foreground">
				{parsed?.source?.component ?? "—"}
			</span>
		</button>
	);
}
export const EventRow = memo(EventRowCmp);
