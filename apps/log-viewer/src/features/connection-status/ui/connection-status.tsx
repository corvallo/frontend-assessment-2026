import { useConnectionStore } from "@/entities/event";
import { ConnectionState } from "@/entities/event/model/types";
import { Badge } from "@/shared/ui/badge";

const connectionStatus: Record<ConnectionState, React.ReactNode> = {
	[ConnectionState.connecting]: (
		<>
			<span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
			Connecting
		</>
	),
	[ConnectionState.connected]: (
		<>
			<span className="w-2 h-2 rounded-full bg-green-600 " />
			Connected
		</>
	),
	[ConnectionState.reconnecting]: (
		<>
			<span className="w-2 h-2 rounded-full bg-sky-600" /> Reconnecting
		</>
	),
	[ConnectionState.disconnected]: (
		<>
			<span className="w-2 h-2 rounded-full bg-red-600" /> Disconnected
		</>
	),
	[ConnectionState["catching-up"]]: (
		<>
			<span className="w-2 h-2 rounded-full bg-orange-600" /> Catching up
		</>
	),
};

export function ConnectionStatus() {
	const connectionState = useConnectionStore((s) => s.connectionState);
	return (
		<Badge
			variant="outline"
			className="h-8 px-4 rounded-md flex gap-2 items-center w-full"
			title={`Connection Status ${connectionStatus[connectionState]}`}
			aria-label={`Connection Status ${connectionStatus[connectionState]}`}
		>
			{connectionStatus[connectionState]}
		</Badge>
	);
}
