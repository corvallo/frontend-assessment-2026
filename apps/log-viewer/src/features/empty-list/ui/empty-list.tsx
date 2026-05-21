import { InboxIcon, ServerOffIcon, Skull } from "lucide-react";
import { useConnectionStore, useEventStore } from "@/entities/event/model";
import { ConnectionState } from "@/entities/event/model/types";

export function EmptyList() {
	const connectionState = useConnectionStore((s) => s.connectionState);
	const events = useEventStore((s) => s.events);

	if (events.size > 0) return null;

	const isDisconnected =
		connectionState === ConnectionState.reconnecting ||
		connectionState === ConnectionState.disconnected;
	const isUnreachable = connectionState === ConnectionState.unreachable;
	return (
		<div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
			{isDisconnected && !isUnreachable && (
				<>
					<ServerOffIcon className="size-10" />
					<p className="text-sm">Server not connected</p>
				</>
			)}
			{!isDisconnected && !isUnreachable && (
				<>
					<InboxIcon className="size-10" />
					<p className="text-sm">No events yet</p>
				</>
			)}
			{isUnreachable && (
				<>
					<Skull className="size-10" />
					<p className="text-sm">Server unreachable</p>
				</>
			)}
		</div>
	);
}
