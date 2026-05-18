import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { connectSSE } from "../connect-sse";
import { MALFORMED_RAW, VALID_K8S_EVENT, VALID_RAW } from "./mocks";

class MockEventSource {
	static instance: MockEventSource;
	url: string;
	onopen: (() => void) | null = null;
	onmessage: ((e: { data: string }) => void) | null = null;
	onerror: ((e: unknown) => void) | null = null;
	close = vi.fn();

	constructor(url: string) {
		this.url = url;
		MockEventSource.instance = this;
	}

	emit(type: "open" | "message" | "error", data?: string) {
		if (type === "open") this.onopen?.();
		if (type === "message") this.onmessage?.({ data: data ?? "" });
		if (type === "error") this.onerror?.(new Event("error"));
	}
}

beforeEach(() => {
	vi.stubGlobal("EventSource", MockEventSource);
	vi.stubEnv("VITE_API_URL", "http://localhost:4000");
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.unstubAllEnvs();
});

describe("connectSSE", () => {
	it("opens connection to correct URL", () => {
		connectSSE({});
		expect(MockEventSource.instance.url).toBe(
			"http://localhost:4000/events/stream",
		);
	});

	it("calls onOpen when connection opens", () => {
		const onOpen = vi.fn();
		connectSSE({ onOpen });
		MockEventSource.instance.emit("open");
		expect(onOpen).toHaveBeenCalledOnce();
	});

	it("calls onMessage with parsed StreamEvent on valid message", () => {
		const onMessage = vi.fn();
		connectSSE({ onMessage });
		MockEventSource.instance.emit("message", VALID_RAW);

		expect(onMessage).toHaveBeenCalledOnce();
		const event = onMessage.mock.calls[0][0];
		expect(event.malformed).toBe(false);
		expect(event.id).toBe(VALID_K8S_EVENT.id);
	});

	it("calls onMessage with malformed=true on bad JSON", () => {
		const onMessage = vi.fn();
		connectSSE({ onMessage });
		MockEventSource.instance.emit("message", MALFORMED_RAW);

		const event = onMessage.mock.calls[0][0];
		expect(event.malformed).toBe(true);
	});

	it("calls onError on connection error", () => {
		const onError = vi.fn();
		connectSSE({ onError });
		MockEventSource.instance.emit("error");
		expect(onError).toHaveBeenCalledOnce();
	});

	it("closes EventSource when close() is called", () => {
		const connection = connectSSE({});
		connection.close();
		expect(MockEventSource.instance.close).toHaveBeenCalledOnce();
	});

	it("works with no handlers provided", () => {
		expect(() => {
			const conn = connectSSE({});
			MockEventSource.instance.emit("open");
			MockEventSource.instance.emit("message", MALFORMED_RAW);
			MockEventSource.instance.emit("error");
			conn.close();
		}).not.toThrow();
	});
});
