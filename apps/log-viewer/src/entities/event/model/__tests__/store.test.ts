import { beforeEach, describe, expect, it } from "vitest";

import { selectEventList } from "../selectors";
import { useConnectionStore, useEventStore } from "../store";
import { makeEvent } from "./mock";

beforeEach(() => {
	useEventStore.setState({ events: new Map() });
	useConnectionStore.setState({ connectionState: "connecting", reconnectCount: 0 });
});

describe("appendEvents", () => {
	it("adds events to the store", () => {
		const events = [makeEvent({ id: "evt_1" }), makeEvent({ id: "evt_2" })];
		useEventStore.getState().appendEvents(events);

		expect(useEventStore.getState().events.size).toBe(2);
	});

	it("deduplicates events by id", () => {
		const first = makeEvent({ id: "evt_1", raw: "first" });
		const duplicate = makeEvent({ id: "evt_1", raw: "duplicate" });

		useEventStore.getState().appendEvents([first]);
		useEventStore.getState().appendEvents([duplicate]);

		expect(useEventStore.getState().events.size).toBe(1);
		expect(useEventStore.getState().events.get("evt_1")?.raw).toBe("duplicate");
	});

	it("incoming overwrites existing same id", () => {
		useEventStore
			.getState()
			.appendEvents([makeEvent({ id: "evt_1", raw: "old" })]);
		useEventStore
			.getState()
			.appendEvents([makeEvent({ id: "evt_1", raw: "new" })]);

		expect(useEventStore.getState().events.get("evt_1")?.raw).toBe("new");
	});

	it("trims to STORE_MAX_EVENTS when exceeded", async () => {
		const { STORE_MAX_EVENTS } = await import("../constants");
		const batch = Array.from({ length: STORE_MAX_EVENTS + 10 }, (_, i) =>
			makeEvent({ id: `evt_${i}` }),
		);
		useEventStore.getState().appendEvents(batch);

		expect(useEventStore.getState().events.size).toBe(STORE_MAX_EVENTS);
	});

	it("keeps newest events when trimming", async () => {
		const { STORE_MAX_EVENTS } = await import("../constants");
		const batch = Array.from({ length: STORE_MAX_EVENTS + 5 }, (_, i) =>
			makeEvent({ id: `evt_${i}` }),
		);
		useEventStore.getState().appendEvents(batch);

		expect(useEventStore.getState().events.has("evt_0")).toBe(false);
		expect(
			useEventStore.getState().events.has(`evt_${STORE_MAX_EVENTS + 4}`),
		).toBe(true);
	});
});

describe("setConnectionState", () => {
	it("updates connectionState", () => {
		useConnectionStore.getState().setConnectionState("connected");
		expect(useConnectionStore.getState().connectionState).toBe("connected");
	});

	it.each(["connecting", "connected", "reconnecting", "catching-up", "disconnected"] as const)(
		"accepts state %s",
		(state) => {
			useConnectionStore.getState().setConnectionState(state);
			expect(useConnectionStore.getState().connectionState).toBe(state);
		},
	);
});

describe("incrementReconnectCount", () => {
	it("starts at 0", () => {
		expect(useConnectionStore.getState().reconnectCount).toBe(0);
	});

	it("increments by 1 each call", () => {
		useConnectionStore.getState().incrementReconnectCount();
		expect(useConnectionStore.getState().reconnectCount).toBe(1);
	});

	it("accumulates across multiple calls", () => {
		useConnectionStore.getState().incrementReconnectCount();
		useConnectionStore.getState().incrementReconnectCount();
		useConnectionStore.getState().incrementReconnectCount();
		expect(useConnectionStore.getState().reconnectCount).toBe(3);
	});

	it("is independent from connectionState changes", () => {
		useConnectionStore.getState().incrementReconnectCount();
		useConnectionStore.getState().setConnectionState("connected");
		expect(useConnectionStore.getState().reconnectCount).toBe(1);
	});
});

describe("selectEventList", () => {
	it("returns events sorted by eventTime ascending", () => {
		const events = [
			makeEvent({
				id: "evt_c",
				parsed: { eventTime: "2026-05-18T10:00:00.000Z" } as never,
			}),
			makeEvent({
				id: "evt_a",
				parsed: { eventTime: "2026-05-18T08:00:00.000Z" } as never,
			}),
			makeEvent({
				id: "evt_b",
				parsed: { eventTime: "2026-05-18T09:00:00.000Z" } as never,
			}),
		];
		useEventStore.getState().appendEvents(events);

		const list = selectEventList(useEventStore.getState());
		expect(list[0].id).toBe("evt_a");
		expect(list[1].id).toBe("evt_b");
		expect(list[2].id).toBe("evt_c");
	});

	it("returns empty array when no events", () => {
		const list = selectEventList(useEventStore.getState());
		expect(list).toHaveLength(0);
	});
});
