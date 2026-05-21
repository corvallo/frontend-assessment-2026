import { describe, expect, it } from "vitest";
import { makeEvent, makeMalformedEvent } from "@/entities/event/model/__tests__/mock";
import { filterEvents } from "../filter-events";

const base = makeEvent({ id: "evt_1" });

describe("filterEvents", () => {
	it("returns all events when query is empty", () => {
		const events = [base, makeEvent({ id: "evt_2" })];
		expect(filterEvents(events, "")).toHaveLength(2);
	});

	it("is case-insensitive", () => {
		expect(filterEvents([base], "TEST MESSAGE")).toHaveLength(1);
		expect(filterEvents([base], "test message")).toHaveLength(1);
	});

	it("filters by message", () => {
		expect(filterEvents([base], "test message")).toHaveLength(1);
		expect(filterEvents([base], "no match")).toHaveLength(0);
	});

	it("filters by namespace", () => {
		expect(filterEvents([base], "default")).toHaveLength(1);
		expect(filterEvents([base], "kube-system")).toHaveLength(0);
	});

	it("filters by reason", () => {
		expect(filterEvents([base], "pulling")).toHaveLength(1);
		expect(filterEvents([base], "backoff")).toHaveLength(0);
	});

	it("filters by involvedObject kind", () => {
		expect(filterEvents([base], "pod")).toHaveLength(1);
	});

	it("filters by involvedObject name", () => {
		expect(filterEvents([base], "my-pod")).toHaveLength(1);
	});

	it("filters by combined kind/name", () => {
		expect(filterEvents([base], "pod/my-pod")).toHaveLength(1);
		expect(filterEvents([base], "deployment/my-pod")).toHaveLength(0);
	});

	it("filters by source component", () => {
		expect(filterEvents([base], "kubelet")).toHaveLength(1);
		expect(filterEvents([base], "scheduler")).toHaveLength(0);
	});

	it("filters malformed events by raw content", () => {
		const malformed = makeMalformedEvent({ id: "evt_bad", raw: "raw-error-content" });
		expect(filterEvents([malformed], "raw-error")).toHaveLength(1);
		expect(filterEvents([malformed], "no-match")).toHaveLength(0);
	});

	it("returns empty array when no events match", () => {
		expect(filterEvents([base], "zzznomatch")).toHaveLength(0);
	});
});
