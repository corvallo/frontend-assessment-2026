import { useEventStore } from "@/entities/event";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import { useEventDetailStore } from "../model";

export function EventDetail() {
	const selectedEventId = useEventDetailStore((s) => s.selectedEventId);
	const clear = useEventDetailStore((s) => s.clear);
	const event = useEventStore((s) =>
		selectedEventId ? s.events.get(selectedEventId) : undefined,
	);
	return (
		<Dialog
			open={selectedEventId !== null}
			onOpenChange={(open) => !open && clear()}
		>
			<DialogContent className="min-w-11/12">
				<DialogHeader>
					<DialogTitle>
						{event?.parsed?.involvedObject?.kind}/
						{event?.parsed?.involvedObject?.name}
					</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
