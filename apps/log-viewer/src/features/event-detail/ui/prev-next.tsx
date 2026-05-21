import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/shared/ui";
import { useEventDetailStore, useSiblingEventDetail } from "../model";

export function PrevNext() {
	const { prevId, nextId, siblingIndex, siblingCount } =
		useSiblingEventDetail();
	const selectEvent = useEventDetailStore((s) => s.selectEvent);
	return (
		<>
			<span className="text-xs text-muted-foreground">
				{siblingCount > 1
					? `${siblingIndex} / ${siblingCount} events for this object`
					: null}
			</span>
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					disabled={!prevId}
					onClick={() => prevId && selectEvent(prevId)}
				>
					<ChevronLeftIcon className="size-4" />
					Prev
				</Button>
				<Button
					variant="outline"
					size="sm"
					disabled={!nextId}
					onClick={() => nextId && selectEvent(nextId)}
				>
					Next
					<ChevronRightIcon className="size-4" />
				</Button>
			</div>
		</>
	);
}
