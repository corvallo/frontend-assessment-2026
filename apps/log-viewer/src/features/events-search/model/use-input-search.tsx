import { useCallback, useRef } from "react";
import { useSearchStore } from "./store";

export function useInputSearch() {
	const setQuery = useSearchStore((s) => s.setQuery);
	const inputRef = useRef("");

	const handleChange = useCallback(
		(val: string) => {
			inputRef.current = val;
			if (val.length === 0) setQuery("");
		},
		[setQuery],
	);

	const submitQuery = useCallback(() => {
		setQuery(inputRef.current);
	}, [setQuery]);

	return { handleChange, submitQuery };
}
