import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { selectEventList, useEventStore } from "@/entities/event";
import { useAutoScrollStore } from "@/features/autoscroll";
import { useEventDetailStore } from "@/features/event-detail/model";
import { useSearchStore } from "@/features/events-search/model";
import { filterEvents } from "./filter-events";

export function useRowsWrapper() {
	const parentRef = useRef<HTMLDivElement>(null);
	const isProgrammaticRef = useRef(false);
	const allEvents = useEventStore(selectEventList);
	const query = useSearchStore((s) => s.query);
	const selectEventId = useEventDetailStore((s) => s.selectEvent);

	const events = useMemo(
		() => filterEvents(allEvents, query),
		[allEvents, query],
	);
	const autoScroll = useAutoScrollStore((s) => s.autoScroll);
	const setAutoScroll = useAutoScrollStore((s) => s.setAutoScroll);

	const virtualizer = useVirtualizer({
		count: events.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => (window.innerWidth < 768 ? 130 : 40),
		enabled: true,
	});

	const handleSelect = useCallback(
		(id: string) => selectEventId(id),
		[selectEventId],
	);

	const scrollToEndInstant = useCallback(() => {
		const el = parentRef.current;
		if (!el) return;
		isProgrammaticRef.current = true;
		el.scrollTop = el.scrollHeight;
		requestAnimationFrame(() => {
			isProgrammaticRef.current = false;
		});
	}, []);

	const scrollToEndSmooth = useCallback(() => {
		const el = parentRef.current;
		if (!el) return;
		isProgrammaticRef.current = true;
		el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
		setTimeout(() => {
			isProgrammaticRef.current = false;
		}, 500);
	}, []);

	useEffect(() => {
		if (!autoScroll || events.length === 0) return;
		scrollToEndInstant();
	}, [events.length, autoScroll, scrollToEndInstant]);

	useEffect(() => {
		const onResize = () => virtualizer.measure();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [virtualizer]);

	const handleScroll = useCallback(() => {
		if (isProgrammaticRef.current) return;
		const el = parentRef.current;
		if (!el) return;
		if (el.contains(document.activeElement)) return;
		const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
		if (!isAtBottom && useAutoScrollStore.getState().autoScroll)
			setAutoScroll(false);
	}, [setAutoScroll]);

	const isScrollable =
		virtualizer.getTotalSize() > (parentRef.current?.clientHeight ?? 0);

	return {
		parentRef,
		events,
		virtualizer,
		isScrollable,
		handleScroll,
		handleSelect,
		scrollToEndSmooth,
	};
}
