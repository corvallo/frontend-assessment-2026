import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useEventStore } from "@/entities/event/model/store";
import { makeEvent, makeMalformedEvent } from "@/entities/event/model/__tests__/mock";
import { useEventDetailStore } from "../store";
import { useYamlSelectedEvent } from "../use-yaml-selected-event";

beforeEach(() => {
	useEventStore.setState({ events: new Map() });
	useEventDetailStore.setState({ selectedEventId: null });
});

describe("useYamlSelectedEvent", () => {
	it("returns empty string when nothing is selected", () => {
		const { result } = renderHook(() => useYamlSelectedEvent());
		expect(result.current.yaml).toBe("");
	});

	it("returns empty string when selected id is not in store", () => {
		useEventDetailStore.getState().selectEvent("non-existent");
		const { result } = renderHook(() => useYamlSelectedEvent());
		expect(result.current.yaml).toBe("");
	});

	it("returns raw string for malformed event", () => {
		const malformed = makeMalformedEvent({ id: "evt_bad" });
		useEventStore.getState().appendEvents([malformed]);
		useEventDetailStore.getState().selectEvent("evt_bad");
		const { result } = renderHook(() => useYamlSelectedEvent());
		expect(result.current.yaml).toBe(malformed.raw);
	});

	it("returns YAML string for normal event", () => {
		useEventStore.getState().appendEvents([makeEvent({ id: "evt_1" })]);
		useEventDetailStore.getState().selectEvent("evt_1");
		const { result } = renderHook(() => useYamlSelectedEvent());
		expect(result.current.yaml).toContain("message: test message");
		expect(result.current.yaml).toContain("namespace: default");
	});

	it("YAML output contains involvedObject fields", () => {
		useEventStore.getState().appendEvents([makeEvent({ id: "evt_1" })]);
		useEventDetailStore.getState().selectEvent("evt_1");
		const { result } = renderHook(() => useYamlSelectedEvent());
		expect(result.current.yaml).toContain("kind: Pod");
		expect(result.current.yaml).toContain("name: my-pod");
	});
});
