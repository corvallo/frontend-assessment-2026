import type { RefObject } from "react";

export type AutoScrollStore = {
	autoScroll: boolean;
	setAutoScroll: (v: boolean) => void;
};

export type UseAutoScrollProps = {
	parentRef: RefObject<HTMLDivElement | null>;
	count: number;
	scrollToEnd: () => void;
};
