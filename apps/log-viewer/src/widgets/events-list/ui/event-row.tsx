import { memo } from "react";
import { EventLevelBadge } from "@/entities/event";
import type { StreamEvent } from "@/shared/api/events/types";
import { formatTime } from "@/shared/lib/format-time";
import {
	type EventRoWVariants,
	eventRowDateWrapper,
	eventRowSpanStyle,
	eventRowStyle,
} from "./event-row.style";

type EventRowProps = {
	event: StreamEvent;
	onSelect: (id: string) => void;
} & EventRoWVariants;
function EventRowCmp({ event, onSelect, malformed = false }: EventRowProps) {
	const parsed = event.parsed;

	return (
		<button
			type="button"
			onClick={() => onSelect(event.id)}
			className={eventRowStyle({ malformed })}
		>
			<div className={eventRowDateWrapper}>
				<span className={eventRowSpanStyle({ mono: true, muted: true })}>
					{malformed
						? formatTime(new Date(event.receivedAt).toISOString())
						: formatTime(parsed?.eventTime)}
				</span>
				<EventLevelBadge type={malformed ? "Malformed" : parsed?.type} />
			</div>
			<span className={eventRowSpanStyle({ hidden_md: malformed })}>
				<span className={eventRowSpanStyle({ hidden_md: true, muted: true })}>
					Namespace:{" "}
				</span>
				{parsed?.metadata?.namespace ?? "—"}
			</span>
			<span className={eventRowSpanStyle({ hidden_md: malformed })}>
				<span className={eventRowSpanStyle({ hidden_md: true, muted: true })}>
					Type:{" "}
				</span>
				{parsed?.reason ?? "—"}
			</span>
			<span
				className={eventRowSpanStyle({
					mono: true,
					destructive: malformed,
					spanned: malformed,
				})}
			>
				<span className={eventRowSpanStyle({ hidden_md: true, muted: true })}>
					{malformed ? "Raw: " : "Object: "}
				</span>
				{malformed
					? event.raw
					: `${parsed?.involvedObject?.kind ? `${parsed.involvedObject.kind}/` : ""}${parsed?.involvedObject?.name ?? "—"}`}
			</span>
			<span
				className={eventRowSpanStyle({ muted: true, hidden_md: malformed })}
			>
				<span className={eventRowSpanStyle({ hidden_md: true })}>
					Message:{" "}
				</span>
				{parsed?.message ?? "—"}
			</span>
			<span
				className={eventRowSpanStyle({ muted: true, hidden_md: malformed })}
			>
				<span className={eventRowSpanStyle({ hidden_md: true })}>Source: </span>
				{parsed?.source?.component ?? "—"}
			</span>
		</button>
	);
}
export const EventRow = memo(EventRowCmp);
