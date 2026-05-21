import { ScrollToBottom } from "@/features/autoscroll";
import { EmptyList } from "@/features/empty-list";
import { useRowsWrapper } from "../model";
import { rowsWrapper } from "./event-list.style";
import { EventRow } from "./event-row";

function RowsWrapper() {
	const {
		parentRef,
		events,
		virtualizer,
		isScrollable,
		handleScroll,
		handleSelect,
		scrollToEndSmooth,
	} = useRowsWrapper();

	return (
		<div ref={parentRef} className={rowsWrapper} onScroll={handleScroll}>
			<EmptyList />

			<div
				style={{
					height: virtualizer.getTotalSize(),
					width: "100%",
					position: "relative",
				}}
			>
				{virtualizer.getVirtualItems().map(({ key, index, start }) => (
					<div
						key={key}
						data-index={index}
						ref={virtualizer.measureElement}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							transform: `translateY(${start}px)`,
						}}
					>
						<EventRow
							event={events[index]}
							onSelect={handleSelect}
							malformed={events[index].malformed}
						/>
					</div>
				))}
			</div>
			<ScrollToBottom
				isScrollable={isScrollable}
				onScrollToEnd={scrollToEndSmooth}
			/>
		</div>
	);
}

export { RowsWrapper };
