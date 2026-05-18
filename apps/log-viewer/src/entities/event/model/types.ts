import type { StreamEvent } from "@/shared/api/events/types";
import type { ValueOf } from "@/shared/model/types";

export const ConnectionState = {
	connecting: "connecting",
	connected: "connected",
	reconnecting: "reconnecting",
	"catching-up": "catching-up",
};

export type ConnectionState = ValueOf<typeof ConnectionState>;

export type EventStore = {
	events: Map<string, StreamEvent>;
	connectionState: ConnectionState;
	appendEvents: (events: StreamEvent[]) => void;
	setConnectionState: (state: ConnectionState) => void;
};
