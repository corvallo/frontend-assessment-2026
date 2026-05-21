import {
	Loader2,
	MonitorOff,
	MonitorPause,
	MonitorPlay,
	Skull,
} from "lucide-react";
import { memo, useCallback } from "react";
import { connectionManager } from "@/entities/event/model/connection-manager";
import { useConnectionStore } from "@/entities/event/model/store";
import { ConnectionState } from "@/entities/event/model/types";
import { Button } from "@/shared/ui";

const transitioningContent: Partial<Record<string, React.ReactNode>> = {
	[ConnectionState.connecting]: (
		<>
			<Loader2 className="animate-spin" /> Connecting
		</>
	),
	[ConnectionState.reconnecting]: (
		<>
			<MonitorOff /> Reconnecting
		</>
	),
	[ConnectionState["catching-up"]]: (
		<>
			<Loader2 className="animate-spin" /> Catching up
		</>
	),
};

function PauseResumeButtonCmp() {
	const connectionState = useConnectionStore((s) => s.connectionState);
	const isConnected = connectionState === ConnectionState.connected;
	const isDisconnected = connectionState === ConnectionState.disconnected;
	const isUnreachable = connectionState === ConnectionState.unreachable;
	const isTransitioning = !isConnected && !isDisconnected;

	const handleClick = () => {
		if (isConnected) connectionManager.disconnect();
		else if (isDisconnected) connectionManager.reconnect();
	};

	return (
		<Button size="lg" disabled={isTransitioning} onClick={handleClick}>
			{isConnected && (
				<>
					<MonitorPause /> Pause
				</>
			)}
			{isDisconnected && (
				<>
					<MonitorPlay /> Resume
				</>
			)}
			{isUnreachable && (
				<>
					<Skull /> Unreachable
				</>
			)}
			{isTransitioning && transitioningContent[connectionState]}
		</Button>
	);
}
//WORKAOUND to avoid unexpected re-renders on this component
//root cause was Concurrent React Tearing with useSyncExternalStore
//REFERENCES:
//https://github.com/pmndrs/zustand/issues/68
//https://interbolt.org/blog/react-ui-tearing/
//https://helloamitpal.medium.com/react-tearing-issue-and-its-antidotes-953cd7c11b6c
//https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering
export const PauseResumeButton = memo(PauseResumeButtonCmp, () => true);
