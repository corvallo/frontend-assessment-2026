import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { catchUpEvents } from "../catch-up";
import { MALFORMED_RAW, VALID_K8S_EVENT, VALID_RAW } from "./mocks";

function mockFetch(response: object, ok = true) {
	vi.stubGlobal(
		"fetch",
		vi.fn().mockResolvedValue({
			ok,
			json: () => Promise.resolve(response),
		}),
	);
}

beforeEach(() => {
	vi.stubEnv("VITE_API_URL", "http://localhost:4000");
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.unstubAllEnvs();
});

describe("catchUpEvents", () => {
	it("calls correct URL with since cursor", async () => {
		mockFetch({ events: [], nextCursor: null });
		await catchUpEvents("evt_abc");

		expect(fetch).toHaveBeenCalledWith(
			"http://localhost:4000/events?since=evt_abc&limit=100",
		);
	});

	it("returns parsed events and nextCursor", async () => {
		mockFetch({ events: [VALID_RAW], nextCursor: "evt_next_1" });
		const result = await catchUpEvents("evt_abc");

		expect(result.events).toHaveLength(1);
		expect(result.events[0].malformed).toBe(false);
		expect(result.events[0].id).toBe(VALID_K8S_EVENT.id);
		expect(result.nextCursor).toBe("evt_next_1");
	});

	it("marks malformed events without throwing", async () => {
		mockFetch({ events: [MALFORMED_RAW, VALID_RAW], nextCursor: null });
		const result = await catchUpEvents("evt_abc");

		expect(result.events).toHaveLength(2);
		expect(result.events[0].malformed).toBe(true);
		expect(result.events[1].malformed).toBe(false);
	});

	it("returns null nextCursor when no more events", async () => {
		mockFetch({ events: [], nextCursor: null });
		const result = await catchUpEvents("evt_abc");

		expect(result.nextCursor).toBeNull();
		expect(result.events).toHaveLength(0);
	});

	it("throws when response is not ok", async () => {
		mockFetch({}, false);

		await expect(catchUpEvents("evt_abc")).rejects.toThrow(
			"Failed to catch up events",
		);
	});
});
