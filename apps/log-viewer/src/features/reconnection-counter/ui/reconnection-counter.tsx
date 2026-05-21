import { RefreshCw } from "lucide-react";
import { useConnectionStore } from "@/entities/event";
import { Badge } from "@/shared/ui/badge";

export function ReconnectionCounter() {
	const reconnectCount = useConnectionStore((s) => s.reconnectCount);
	const labelReconnection = `${reconnectCount} ${reconnectCount === 1 ? " reconnection" : " reconnections"}`;

	return (
		<Badge
			variant="outline"
			className="h-8 px-4 rounded-md flex gap-2 items-center"
			title={labelReconnection}
			aria-label={labelReconnection}
		>
			<RefreshCw className="size-3" /> {labelReconnection}
		</Badge>
	);
}
