import { beforeEach, describe, expect, it } from "vitest";
import { useEventDetailStore } from "../store";

beforeEach(() => {
	useEventDetailStore.setState({ selectedEventId: null });
});

describe("selectEvent", () => {
	it("sets selectedEventId", () => {
		useEventDetailStore.getState().selectEvent("evt_1");
		expect(useEventDetailStore.getState().selectedEventId).toBe("evt_1");
	});

	it("overwrites previous selection", () => {
		useEventDetailStore.getState().selectEvent("evt_1");
		useEventDetailStore.getState().selectEvent("evt_2");
		expect(useEventDetailStore.getState().selectedEventId).toBe("evt_2");
	});
});

describe("clear", () => {
	it("resets selectedEventId to null", () => {
		useEventDetailStore.getState().selectEvent("evt_1");
		useEventDetailStore.getState().clear();
		expect(useEventDetailStore.getState().selectedEventId).toBeNull();
	});

	it("is a no-op when nothing selected", () => {
		useEventDetailStore.getState().clear();
		expect(useEventDetailStore.getState().selectedEventId).toBeNull();
	});
});
