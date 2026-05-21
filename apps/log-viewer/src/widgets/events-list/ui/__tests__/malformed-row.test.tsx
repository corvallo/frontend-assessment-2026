import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { makeMalformedEvent } from "@/entities/event/model/__tests__/mock";
import { EventRow } from "../event-row";

afterEach(cleanup);

const malformedEvent = makeMalformedEvent({ id: "evt_bad" });

describe("EventRow (malformed variant)", () => {
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
