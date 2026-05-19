import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MalformedRow } from "../malformed-row";

afterEach(cleanup);

const malformedEvent = {
	id: "evt_bad",
	raw: '{"broken": true, "missing_fields": 1}',
	malformed: true,
	receivedAt: new Date("2026-05-18T10:00:00.000Z").getTime(),
	parsed: undefined,
};

describe("MalformedRow", () => {
	it("renders Malformed badge", () => {
		render(<MalformedRow event={malformedEvent} />);
		expect(screen.queryByText("Malformed")).not.toBeNull();
	});

	it("renders raw payload", () => {
		render(<MalformedRow event={malformedEvent} />);
		expect(screen.queryAllByText(malformedEvent.raw).length).toBeGreaterThan(0);
	});
});
