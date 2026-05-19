import { connectSSE } from "@/shared/api/events";
import { catchUpEvents } from "@/shared/api/events/catch-up";
import type { StreamEvent } from "@/shared/api/events/types";
import { BATCH_INTERVAL } from "./constants";
import { useConnectionStore, useEventStore } from "./store";
import { ConnectionState } from "./types";

class ConnectionManager {
	private connection: ReturnType<typeof connectSSE> | null = null;
	private lastEventId: string | null = null;
	private reconnecting = false;
	private queue: StreamEvent[] = [];
	private batchTimer: number | null = null;

	private flush() {
		if (this.queue.length === 0) return;
		useEventStore.getState().appendEvents(this.queue);
		this.queue = [];
	}

	private async recoverMissedEvents() {
		if (!this.lastEventId) return;
		try {
			useConnectionStore
				.getState()
				.setConnectionState(ConnectionState["catching-up"]);
			const { events } = await catchUpEvents(this.lastEventId);
			if (events.length > 0) {
				this.queue.push(...events);
				const lastValid = events.findLast((e) => !e.malformed);
				if (lastValid) this.lastEventId = lastValid.id;
			}
		} catch (e) {
			console.error("[CM] Recovery failed", e);
		}
	}

	private handleIncomingEvent(event: StreamEvent) {
		if (!event.malformed) this.lastEventId = event.id;
		this.queue.push(event);
	}

	connect() {
		if (!this.batchTimer) {
			this.batchTimer = window.setInterval(() => this.flush(), BATCH_INTERVAL);
		}
		useConnectionStore
			.getState()
			.setConnectionState(ConnectionState.connecting);

		this.connection = connectSSE({
			onOpen: async () => {
				if (this.reconnecting) await this.recoverMissedEvents();
				this.reconnecting = false;
				useConnectionStore
					.getState()
					.setConnectionState(ConnectionState.connected);
			},
			onError: (_e) => {
				this.reconnecting = true;
				useConnectionStore.getState().incrementReconnectCount();
				useConnectionStore
					.getState()
					.setConnectionState(ConnectionState.reconnecting);
			},
			onMessage: (evt) => this.handleIncomingEvent(evt),
		});
	}
	reconnect() {
		this.connection?.close();
		this.connection = null;
		this.connect();
	}
	disconnect() {
		useConnectionStore
			.getState()
			.setConnectionState(ConnectionState.disconnected);
		this.connection?.close();
		this.connection = null;
	}
	cleanup() {
		if (this.batchTimer !== null) {
			clearInterval(this.batchTimer);
			this.batchTimer = null;
		}
		this.connection?.close();
		this.connection = null;
	}
}
export const connectionManager = new ConnectionManager();
