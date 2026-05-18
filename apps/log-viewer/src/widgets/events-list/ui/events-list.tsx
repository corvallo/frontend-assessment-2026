import { EventsSearch } from "@/features/events-search";
import { ColumnsHeader } from "./columns-header";
import { filtersSection, rowsWrapper, wrapper } from "./event-list.style";
import { Rows } from "./rows";

export function EventsList() {
	return (
		<div className={wrapper}>
			<div className={filtersSection}>
				<EventsSearch />
			</div>

			<ColumnsHeader />
			<div className={rowsWrapper}>
				<Rows />
			</div>
		</div>
	);
}
