import { malformedCount, useEventStore } from "@/entities/event";
import { Badge } from "@/shared/ui/badge";

export function MalformedCounter() {
	const count = useEventStore(malformedCount);
	const label = `Malformed events: ${count}`;
	return (
		<Badge
			variant="outline"
			className="h-8 px-4 rounded-md flex gap-2 items-center w-full"
			aria-label={label}
			title={label}
		>
			<span className="text-md">Malformed:</span>
			<span
				className="font-bold text-destructive"
				title={`Total events: ${count}`}
			>
				{count}
			</span>
		</Badge>
	);
}
