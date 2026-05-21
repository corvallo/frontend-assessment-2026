import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { makeEvent, makeMalformedEvent } from "@/entities/event/model/__tests__/mock";
import { EventRow } from "../event-row";

afterEach(cleanup);

const baseEvent = makeEvent({ id: "evt_1" });

describe("EventRow", () => {
	it("renders namespace", () => {
		render(<EventRow event={baseEvent} onSelect={vi.fn()} />);
		expect(screen.queryByText("default")).not.toBeNull();
	});

	it("renders message", () => {
		render(<EventRow event={baseEvent} onSelect={vi.fn()} />);
		expect(screen.queryAllByText("test message").length).toBeGreaterThan(0);
	});

	it("renders involvedObject as Kind/name", () => {
		render(<EventRow event={baseEvent} onSelect={vi.fn()} />);
		const matches = screen.queryAllByText(/Pod\//);
		expect(matches.length).toBeGreaterThan(0);
	});

	it("calls onSelect with event id on click", () => {
		const onSelect = vi.fn();
		render(<EventRow event={baseEvent} onSelect={onSelect} />);
		const buttons = screen.queryAllByRole("button");
		fireEvent.click(buttons[0]);
		expect(onSelect).toHaveBeenCalledWith("evt_1");
		expect(onSelect).toHaveBeenCalledTimes(1);
	});

	it("renders — for missing fields", () => {
		const event = makeEvent({
			id: "evt_empty",
			parsed: {
				id: "evt_empty",
				eventTime: "2026-05-18T08:00:00.000Z",
			} as never,
		});
		render(<EventRow event={event} onSelect={vi.fn()} />);
		expect(screen.queryAllByText("—").length).toBeGreaterThan(0);
	});
});

describe("EventRow malformed variant", () => {
	const malformedEvent = makeMalformedEvent({ id: "evt_bad" });

	it("renders Malformed badge", () => {
		render(<EventRow event={malformedEvent} onSelect={vi.fn()} malformed />);
		expect(screen.queryByText("Malformed")).not.toBeNull();
	});

	it("renders raw content", () => {
		render(<EventRow event={malformedEvent} onSelect={vi.fn()} malformed />);
		expect(screen.queryByText(malformedEvent.raw)).not.toBeNull();
	});

	it("does not render Normal or Warning badge", () => {
		render(<EventRow event={malformedEvent} onSelect={vi.fn()} malformed />);
		expect(screen.queryByText("Normal")).toBeNull();
		expect(screen.queryByText("Warning")).toBeNull();
	});

	it("calls onSelect with event id on click", () => {
		const onSelect = vi.fn();
		render(<EventRow event={malformedEvent} onSelect={onSelect} malformed />);
		fireEvent.click(screen.getByRole("button"));
		expect(onSelect).toHaveBeenCalledWith("evt_bad");
		expect(onSelect).toHaveBeenCalledTimes(1);
	});
});
