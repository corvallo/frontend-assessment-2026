import { ConnectionStatus } from "@/features/connection-status";
import { EventsCounter } from "@/features/events-counter";
import { MalformedCounter } from "@/features/malformed-counter";
import { RateSelector } from "@/features/rate-selector";
import { ReconnectionCounter } from "@/features/reconnection-counter";
import { toolbarStyle } from "./toolbar.style";

export function Toolbar() {
	return (
		<div role="status" aria-label="Stream status" className={toolbarStyle}>
			<div className="hidden md:flex gp-2">
				<EventsCounter />
				<MalformedCounter />
				<ReconnectionCounter />
				<ConnectionStatus />
			</div>
			<RateSelector />
		</div>
	);
}
