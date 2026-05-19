import type { StreamEvent } from "@/shared/api/events/types";
import type { ValueOf } from "@/shared/model/types";

export const ConnectionState = {
	connecting: "connecting",
	connected: "connected",
	reconnecting: "reconnecting",
	"catching-up": "catching-up",
	disconnected: "disconnected",
} as const;

export type ConnectionState = ValueOf<typeof ConnectionState>;

export type EventStore = {
	events: Map<string, StreamEvent>;
	appendEvents: (events: StreamEvent[]) => void;
};

export type ConnectionStore = {
	connectionState: ConnectionState;
	reconnectCount: number;
	setConnectionState: (state: ConnectionState) => void;
	incrementReconnectCount: () => void;
};
