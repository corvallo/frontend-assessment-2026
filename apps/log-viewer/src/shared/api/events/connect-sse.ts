import { parseEvent } from "./parse-event";
import type { SSEHandlers } from "./types";

export function connectSSE(handlers: SSEHandlers) {
	const { onOpen, onMessage, onError } = handlers;

	const eventSource = new EventSource(
		`${import.meta.env.VITE_API_URL}/events/stream`,
	);

	eventSource.onopen = () => {
		onOpen?.();
	};

	eventSource.onmessage = (event) => {
		const parsed = parseEvent(event.data);

		onMessage?.(parsed);
	};
	//TODO: retry backoff logic
	eventSource.onerror = (error) => {
		onError?.(error);
	};

	return {
		close() {
			eventSource.close();
		},
	};
}
