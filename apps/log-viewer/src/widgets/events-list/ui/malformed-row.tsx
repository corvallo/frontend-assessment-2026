import { memo } from "react";
import type { StreamEvent } from "@/shared/api/events/types";
import { formatTime } from "@/shared/lib/format-time";
import { Badge } from "@/shared/ui/badge";

function MalformedRowCmp({ event }: { event: StreamEvent }) {
	return (
		<div className="grid grid-cols-[120px_90px_1fr_1fr_1fr_2fr_1fr] items-center gap-4 px-4 py-2 border-b border-border text-xs bg-destructive/5">
			<span className="font-mono truncate text-muted-foreground">
				{formatTime(new Date(event.receivedAt).toISOString())}
			</span>
			<Badge variant="destructive">Malformed</Badge>
			<span className="col-span-5 truncate font-mono text-destructive/70">
				{event.raw}
			</span>
		</div>
	);
}
export const MalformedRow = memo(MalformedRowCmp);
