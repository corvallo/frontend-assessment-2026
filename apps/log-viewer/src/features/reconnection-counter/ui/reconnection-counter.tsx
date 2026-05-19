import { RefreshCw } from "lucide-react";
import { useConnectionStore } from "@/entities/event";
import { Badge } from "@/shared/ui/badge";

export function ReconnectionCounter() {
	const reconnectCount = useConnectionStore((s) => s.reconnectCount);
	return (
		<Badge
			variant="outline"
			className="h-8 px-4 rounded-md flex gap-2 items-center w-full"
			title={reconnectCount === 1 ? " reconnection" : " reconnections"}
			aria-label={reconnectCount === 1 ? " reconnection" : " reconnections"}
		>
			<RefreshCw className="size-3" /> {reconnectCount}
			{reconnectCount === 1 ? " reconnection" : " reconnections"}
		</Badge>
	);
}
