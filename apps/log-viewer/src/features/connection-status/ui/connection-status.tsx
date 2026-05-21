import { useConnectionStore } from "@/entities/event";
import { ConnectionState } from "@/entities/event/model/types";
import { Badge } from "@/shared/ui/badge";

const connectionStatusLabel: Record<ConnectionState, string> = {
	[ConnectionState.connecting]: "Connecting",
	[ConnectionState.connected]: "Connected",
	[ConnectionState.reconnecting]: "Reconnecting",
	[ConnectionState.disconnected]: "Disconnected",
	[ConnectionState["catching-up"]]: "Catching up",
	[ConnectionState.unreachable]: "Unreachable",
};

const connectionStatus: Record<ConnectionState, React.ReactNode> = {
	[ConnectionState.connecting]: (
		<>
			<span
				className="w-2 h-2 rounded-full bg-green-600 animate-pulse"
				aria-hidden="true"
			/>
			Connecting
		</>
	),
	[ConnectionState.connected]: (
		<>
			<span className="w-2 h-2 rounded-full bg-green-600 " aria-hidden="true" />
			Connected
		</>
	),
	[ConnectionState.reconnecting]: (
		<>
			<span className="w-2 h-2 rounded-full bg-sky-600" aria-hidden="true" />{" "}
			Reconnecting
		</>
	),
	[ConnectionState.disconnected]: (
		<>
			<span className="w-2 h-2 rounded-full bg-red-600" aria-hidden="true" />{" "}
			Disconnected
		</>
	),
	[ConnectionState["catching-up"]]: (
		<>
			<span className="w-2 h-2 rounded-full bg-orange-600" aria-hidden="true" />{" "}
			Catching up
		</>
	),
	[ConnectionState.unreachable]: (
		<>
			<span className="w-2 h-2 rounded-full bg-violet-600" aria-hidden="true" />{" "}
			Unreachable
		</>
	),
};

export function ConnectionStatus() {
	const connectionState = useConnectionStore((s) => s.connectionState);
	return (
		<Badge
			variant="outline"
			className="h-8 px-4 rounded-md flex gap-2 items-center"
			aria-label={`Connection: ${connectionStatusLabel[connectionState]}`}
			aria-live="polite"
		>
			{connectionStatus[connectionState]}
		</Badge>
	);
}
