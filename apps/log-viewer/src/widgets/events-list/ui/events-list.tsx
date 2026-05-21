import { memo } from "react";
import { Autoscroll } from "@/features/autoscroll";
import { EventDetail } from "@/features/event-detail/ui/event-detail";
import { EventsSearch } from "@/features/events-search";
import { LastEvents } from "@/features/last-events/ui";
import { PauseResumeButton } from "@/features/pause-resume-button";
import { ColumnsHeader } from "./columns-header";
import { filtersSection, wrapper } from "./event-list.style";
import { RowsWrapper } from "./rows-wrapper";

function EventsListCmp() {
	return (
		<section className={wrapper} aria-label="K8s event log">
			<div className={filtersSection}>
				<EventsSearch />
				<PauseResumeButton />
				<Autoscroll />
			</div>
			<ColumnsHeader />

			<EventDetail />
			<RowsWrapper />
			<LastEvents />
		</section>
	);
}
export const EventsList = memo(EventsListCmp);
