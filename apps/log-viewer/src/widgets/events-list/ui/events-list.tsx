import { memo } from "react";
import { EventDetail } from "@/features/event-detail/ui/event-detail";
import { EventsSearch } from "@/features/events-search";
import { PauseResumeButton } from "@/features/pause-resume-button";
import { Label, Switch } from "@/shared/ui";
import { ColumnsHeader } from "./columns-header";
import { filtersSection, wrapper } from "./event-list.style";
import { RowsWrapper } from "./rows-wrapper";

function EventsListCmp() {
	return (
		<div className={wrapper}>
			<div className={filtersSection}>
				<EventsSearch />
				{/** <EventsConunter/> */}
				<div className="flex items-center space-x-2">
					<Switch id="airplane-mode" />
					<Label htmlFor="airplane-mode">Auto Scroll</Label>
				</div>
				<PauseResumeButton />
			</div>
			<ColumnsHeader />
			<EventDetail />
			<RowsWrapper />
		</div>
	);
}
export const EventsList = memo(EventsListCmp);
