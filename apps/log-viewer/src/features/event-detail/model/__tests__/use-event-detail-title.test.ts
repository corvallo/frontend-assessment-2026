import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
	makeEvent,
	makeMalformedEvent,
} from "@/entities/event/model/__tests__/mock";
import { useEventStore } from "@/entities/event/model/store";
import type { StreamEvent } from "@/shared/api/events/types";
import { useEventDetailStore } from "../store";
import { useEventDetailTitle } from "../use-event-detail-title";

beforeEach(() => {
	useEventStore.setState({ events: new Map() });
	useEventDetailStore.setState({ selectedEventId: null });
});

describe("useEventDetailTitle", () => {
	it("returns empty string when nothing is selected", () => {
		const { result } = renderHook(() => useEventDetailTitle());
		expect(result.current).toBe("");
	});

	it("returns empty string when selected id is not in store", () => {
		useEventDetailStore.getState().selectEvent("non-existent");
		const { result } = renderHook(() => useEventDetailTitle());
		expect(result.current).toBe("");
	});

	it("returns kind/name for a normal event", () => {
		useEventStore.getState().appendEvents([makeEvent({ id: "evt_1" })]);
		useEventDetailStore.getState().selectEvent("evt_1");
		const { result } = renderHook(() => useEventDetailTitle());
		expect(result.current).toBe("Pod/my-pod");
	});

	it("returns 'Malformed Event' for a malformed event", () => {
		const malformed = makeMalformedEvent({ id: "evt_bad" });
		useEventStore.getState().appendEvents([malformed]);
		useEventDetailStore.getState().selectEvent("evt_bad");
		const { result } = renderHook(() => useEventDetailTitle());
		expect(result.current).toBe("Malformed Event");
	});

	it("falls back to empty strings when kind and name are missing", () => {
		const event: StreamEvent = {
			id: "evt_1",
			raw: "{}",
			malformed: false,
			receivedAt: Date.now(),
			parsed: { id: "evt_1", involvedObject: {} },
		};
		useEventStore.getState().appendEvents([event]);
		useEventDetailStore.getState().selectEvent("evt_1");
		const { result } = renderHook(() => useEventDetailTitle());
		expect(result.current).toBe("/");
	});
});
