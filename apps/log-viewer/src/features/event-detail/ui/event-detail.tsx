import { memo } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui";
import { useEventDetailStore } from "../model";
import { Content } from "./content";
import { dialogContent, dialogFooter } from "./event-detail.style";
import { EventDetailTitle } from "./event-detail-title";
import { PrevNext } from "./prev-next";

export function EventDetailCmp() {
	const selectedEventId = useEventDetailStore((s) => s.selectedEventId);
	const clear = useEventDetailStore((s) => s.clear);

	return (
		<Dialog
			open={selectedEventId !== null}
			onOpenChange={(open) => !open && clear()}
		>
			<DialogContent className={dialogContent}>
				<DialogHeader>
					<DialogTitle>
						<EventDetailTitle />
					</DialogTitle>
				</DialogHeader>
				<Content />
				<DialogFooter className={dialogFooter}>
					<PrevNext />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
export const EventDetail = memo(EventDetailCmp);
