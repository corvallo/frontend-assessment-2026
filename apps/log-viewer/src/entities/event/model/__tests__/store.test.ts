import { beforeEach, describe, expect, it } from "vitest";
import { selectEventList } from "../selectors";
import { useEventStore } from "../store";
import { makeEvent } from "./mock";

beforeEach(() => {
	useEventStore.setState({ events: new Map(), connectionState: "connecting" });
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
		useEventStore.getState().appendEvents([makeEvent({ id: "evt_1", raw: "old" })]);
		useEventStore.getState().appendEvents([makeEvent({ id: "evt_1", raw: "new" })]);

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
		expect(useEventStore.getState().events.has(`evt_${STORE_MAX_EVENTS + 4}`)).toBe(true);
	});
});

describe("setConnectionState", () => {
	it("updates connectionState", () => {
		useEventStore.getState().setConnectionState("connected");
		expect(useEventStore.getState().connectionState).toBe("connected");
	});
});

describe("selectEventList", () => {
	it("returns events sorted by eventTime ascending", () => {
		const events = [
			makeEvent({ id: "evt_c", parsed: { eventTime: "2026-05-18T10:00:00.000Z" } as never }),
			makeEvent({ id: "evt_a", parsed: { eventTime: "2026-05-18T08:00:00.000Z" } as never }),
			makeEvent({ id: "evt_b", parsed: { eventTime: "2026-05-18T09:00:00.000Z" } as never }),
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
