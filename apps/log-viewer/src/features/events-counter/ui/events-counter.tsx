import { useEventStore } from "@/entities/event";
import { Badge } from "@/shared/ui/badge";

export function EventsCounter() {
	const count = useEventStore((s) => s.events.size);
	const label = `Total events: ${count}`;
	return (
		<Badge
			variant="outline"
			className="h-8 px-4 rounded-md flex gap-2 items-center"
			aria-label={label}
			title={label}
		>
			<span className="text-md">Total events:</span>
			<span className="font-bold" title={`Total events: ${count}`}>
				{count}
			</span>
		</Badge>
	);
}
