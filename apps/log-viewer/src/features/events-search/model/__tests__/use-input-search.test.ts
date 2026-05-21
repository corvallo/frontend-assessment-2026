import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSearchStore } from "../store";
import { useInputSearch } from "../use-input-search";

beforeEach(() => {
	useSearchStore.setState({ query: "" });
});

describe("useInputSearch", () => {
	describe("handleChange", () => {
		it("clears store query immediately when value is empty", () => {
			const { result } = renderHook(() => useInputSearch());
			result.current.handleChange("hello");
			result.current.handleChange("");
			expect(useSearchStore.getState().query).toBe("");
		});

		it("does not update store query for non-empty values", () => {
			const { result } = renderHook(() => useInputSearch());
			result.current.handleChange("hello");
			expect(useSearchStore.getState().query).toBe("");
		});
	});

	describe("submitQuery", () => {
		it("sets store query to current input value", () => {
			const { result } = renderHook(() => useInputSearch());
			result.current.handleChange("my-pod");
			result.current.submitQuery();
			expect(useSearchStore.getState().query).toBe("my-pod");
		});

		it("submits empty string when input is empty", () => {
			const { result } = renderHook(() => useInputSearch());
			result.current.submitQuery();
			expect(useSearchStore.getState().query).toBe("");
		});

		it("submits last value after multiple changes", () => {
			const { result } = renderHook(() => useInputSearch());
			result.current.handleChange("first");
			result.current.handleChange("second");
			result.current.handleChange("third");
			result.current.submitQuery();
			expect(useSearchStore.getState().query).toBe("third");
		});

		it("submits empty after clearing", () => {
			const { result } = renderHook(() => useInputSearch());
			result.current.handleChange("hello");
			result.current.handleChange("");
			result.current.submitQuery();
			expect(useSearchStore.getState().query).toBe("");
		});
	});
});
