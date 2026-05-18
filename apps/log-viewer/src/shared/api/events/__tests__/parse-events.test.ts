import { describe, expect, it } from "vitest";
import { parseEvent } from "../parse-event";
import {
	MALFORMED_RAW,
	NON_K8S_RAW,
	VALID_K8S_EVENT,
	VALID_RAW,
} from "./mocks";

describe("parseEvent", () => {
	it("parses a valid K8s event", () => {
		const result = parseEvent(VALID_RAW);

		expect(result.malformed).toBe(false);
		expect(result.id).toBe(VALID_K8S_EVENT.id);
		expect(result.parsed?.message).toBe(VALID_K8S_EVENT.message);
		expect(result.raw).toBe(VALID_RAW);
		expect(result.receivedAt).toBeLessThanOrEqual(Date.now());
	});

	it("generates id when event has none", () => {
		const { id: _id, ...withoutId } = VALID_K8S_EVENT;
		const result = parseEvent(JSON.stringify(withoutId));

		expect(result.malformed).toBe(false);
		expect(result.id).toBeTruthy();
	});

	it("marks as malformed when JSON is invalid", () => {
		const result = parseEvent(MALFORMED_RAW);

		expect(result.malformed).toBe(true);
		expect(result.parsed).toBeUndefined();
		expect(result.id).toBeTruthy();
	});

	it("marks as malformed when JSON is valid but not a K8s Event", () => {
		const result = parseEvent(NON_K8S_RAW);

		expect(result.malformed).toBe(true);
		expect(result.parsed).toBeUndefined();
	});

	it("marks as malformed when kind is not Event", () => {
		const result = parseEvent(
			JSON.stringify({ ...VALID_K8S_EVENT, kind: "Pod" }),
		);

		expect(result.malformed).toBe(true);
	});

	it("marks as malformed on truncated JSON", () => {
		const result = parseEvent(VALID_RAW.slice(0, 50));

		expect(result.malformed).toBe(true);
	});

	it("preserves raw string in all cases", () => {
		const result = parseEvent(MALFORMED_RAW);

		expect(result.raw).toBe(MALFORMED_RAW);
	});
});
