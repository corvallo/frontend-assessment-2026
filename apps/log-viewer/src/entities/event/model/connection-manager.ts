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

	private retryCount: number = 0;
	private retryTimer: number | null = null;

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

	private scheduleReconnect() {
		if (this.retryTimer) {
			console.log("[CM] scheduleReconnect: timer already pending, skip");
			return;
		}
		const delay = Math.min(1000 * 2 ** this.retryCount, 30000);
		console.log(
			`[CM] scheduleReconnect: retryCount=${this.retryCount} delay=${delay}ms`,
		);
		this.retryTimer = window.setTimeout(() => {
			console.log("[CM] retryTimer fired, calling reconnect()");
			this.retryTimer = null;
			this.reconnect();
		}, delay);
		if (this.retryCount >= 5) {
			useConnectionStore
				.getState()
				.setConnectionState(ConnectionState.unreachable);
		}
		this.retryCount++;
	}
	connect() {
		if (!this.batchTimer) {
			this.batchTimer = window.setInterval(() => this.flush(), BATCH_INTERVAL);
		}
		console.log("[CM] connect()");
		useConnectionStore
			.getState()
			.setConnectionState(ConnectionState.connecting);

		this.connection = connectSSE({
			onOpen: async () => {
				console.log("[CM] onOpen — resetting retryCount");
				this.retryCount = 0;
				if (this.reconnecting) await this.recoverMissedEvents();
				this.reconnecting = false;
				useConnectionStore
					.getState()
					.setConnectionState(ConnectionState.connected);
			},
			onError: (_e) => {
				console.log(`[CM] onError — retryTimer=${this.retryTimer}`);
				if (this.retryTimer !== null) {
					console.log(
						"[CM] onError: timer pending, closing connection and returning",
					);
					this.connection?.close();
					this.connection = null;
					return;
				}
				this.reconnecting = true;
				this.connection?.close();
				this.connection = null;
				useConnectionStore.getState().incrementReconnectCount();
				useConnectionStore
					.getState()
					.setConnectionState(ConnectionState.reconnecting);
				this.scheduleReconnect();
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
		if (this.retryTimer) {
			clearTimeout(this.retryTimer);
			this.retryTimer = null;
		}
		this.connection?.close();
		this.connection = null;
	}
}
export const connectionManager = new ConnectionManager();
