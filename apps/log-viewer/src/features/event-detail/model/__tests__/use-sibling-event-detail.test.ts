import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useEventStore } from "@/entities/event/model/store";
import type { StreamEvent } from "@/shared/api/events/types";
import { useEventDetailStore } from "../store";
import { useSiblingEventDetail } from "../use-sibling-event-detail";

const UID = "uid-pod-abc";

function makeSibling(id: string, eventTime: string): StreamEvent {
	return {
		id,
		raw: `{"id":"${id}"}`,
		malformed: false,
		receivedAt: Date.now(),
		parsed: {
			id,
			eventTime,
			involvedObject: { kind: "Pod", name: "my-pod", uid: UID },
		},
	};
}

beforeEach(() => {
	useEventStore.setState({ events: new Map() });
	useEventDetailStore.setState({ selectedEventId: null });
});

describe("useSiblingEventDetail", () => {
	it("returns empty state when nothing is selected", () => {
		const { result } = renderHook(() => useSiblingEventDetail());
		expect(result.current.prevId).toBeNull();
		expect(result.current.nextId).toBeNull();
		expect(result.current.siblingCount).toBe(0);
		expect(result.current.siblingIndex).toBe(0);
	});

	it("returns nulls when selected event has no involvedObject.uid", () => {
		const event: StreamEvent = {
			id: "evt_1",
			raw: "{}",
			malformed: false,
			receivedAt: Date.now(),
			parsed: { id: "evt_1", eventTime: "2026-01-01T00:00:00.000Z" },
		};
		useEventStore.getState().appendEvents([event]);
		useEventDetailStore.getState().selectEvent("evt_1");
		const { result } = renderHook(() => useSiblingEventDetail());
		expect(result.current.prevId).toBeNull();
		expect(result.current.nextId).toBeNull();
		expect(result.current.siblingCount).toBe(0);
	});

	it("returns null prevId for first sibling", () => {
		const evt1 = makeSibling("evt_1", "2026-01-01T08:00:00.000Z");
		const evt2 = makeSibling("evt_2", "2026-01-01T09:00:00.000Z");
		useEventStore.getState().appendEvents([evt1, evt2]);
		useEventDetailStore.getState().selectEvent("evt_1");
		const { result } = renderHook(() => useSiblingEventDetail());
		expect(result.current.prevId).toBeNull();
		expect(result.current.nextId).toBe("evt_2");
		expect(result.current.siblingIndex).toBe(1);
		expect(result.current.siblingCount).toBe(2);
	});

	it("returns null nextId for last sibling", () => {
		const evt1 = makeSibling("evt_1", "2026-01-01T08:00:00.000Z");
		const evt2 = makeSibling("evt_2", "2026-01-01T09:00:00.000Z");
		useEventStore.getState().appendEvents([evt1, evt2]);
		useEventDetailStore.getState().selectEvent("evt_2");
		const { result } = renderHook(() => useSiblingEventDetail());
		expect(result.current.prevId).toBe("evt_1");
		expect(result.current.nextId).toBeNull();
		expect(result.current.siblingIndex).toBe(2);
		expect(result.current.siblingCount).toBe(2);
	});

	it("middle sibling has both prev and next", () => {
		const evt1 = makeSibling("evt_1", "2026-01-01T08:00:00.000Z");
		const evt2 = makeSibling("evt_2", "2026-01-01T09:00:00.000Z");
		const evt3 = makeSibling("evt_3", "2026-01-01T10:00:00.000Z");
		useEventStore.getState().appendEvents([evt1, evt2, evt3]);
		useEventDetailStore.getState().selectEvent("evt_2");
		const { result } = renderHook(() => useSiblingEventDetail());
		expect(result.current.prevId).toBe("evt_1");
		expect(result.current.nextId).toBe("evt_3");
		expect(result.current.siblingIndex).toBe(2);
		expect(result.current.siblingCount).toBe(3);
	});

	it("excludes events with a different uid", () => {
		const sibling = makeSibling("evt_1", "2026-01-01T08:00:00.000Z");
		const other: StreamEvent = {
			id: "evt_other",
			raw: "{}",
			malformed: false,
			receivedAt: Date.now(),
			parsed: {
				id: "evt_other",
				eventTime: "2026-01-01T07:00:00.000Z",
				involvedObject: { uid: "other-uid" },
			},
		};
		useEventStore.getState().appendEvents([sibling, other]);
		useEventDetailStore.getState().selectEvent("evt_1");
		const { result } = renderHook(() => useSiblingEventDetail());
		expect(result.current.siblingCount).toBe(1);
		expect(result.current.prevId).toBeNull();
		expect(result.current.nextId).toBeNull();
	});
});
