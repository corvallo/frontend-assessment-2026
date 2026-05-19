import { useMemo } from "react";
import { useEventStore } from "@/entities/event";

const COL =
	"lg:grid lg:grid-cols-[120px_90px_1fr_1fr_1fr_2fr_1fr] lg:items-center lg:gap-4 lg:px-4";

export function Rows() {
	const eventsMap = useEventStore((s) => s.events);
	const events = useMemo(() => Array.from(eventsMap.values()), [eventsMap]);
	return (
		<>
			{events.map((event) => (
				<div
					key={event.id}
					className={`${COL} border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors
								flex flex-col gap-1 px-4 py-3
								lg:flex-none lg:py-2 lg:text-sm`}
				>
					<div>{event.id}</div>
					{/* <div className="flex items-center justify-between lg:contents">
						<span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
							<span
								className={`size-1.5 rounded-full shrink-0 ${levelDot[event.level]}`}
							/>
							{event.time}
						</span>
						<span className={`text-xs font-medium ${levelText[event.level]}`}>
							{event.level}
						</span>
						<span className="truncate text-muted-foreground hidden lg:block">
							{event.namespace}
						</span>
						<span className="truncate hidden lg:block">{event.type}</span>
						<span className="truncate font-mono text-xs hidden lg:block">
							{event.object}
						</span>
						<span className="truncate hidden lg:block">{event.message}</span>
						<span className="truncate text-xs text-muted-foreground hidden lg:block">
							{event.source}
						</span>
					</div>
					{/* Mobile-only extra info */}
					{/*<div className="lg:hidden">
						<p className="font-mono text-xs truncate text-muted-foreground">
							{event.object}
						</p>
						<p className="text-sm truncate">{event.message}</p>
						<p className="text-xs text-muted-foreground">
							{event.namespace} · {event.type} · {event.source}
						</p>
					</div> */}
				</div>
			))}
		</>
	);
}
