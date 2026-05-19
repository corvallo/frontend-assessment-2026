import { useEffect } from "react";
import { connectionManager } from "./connection-manager";

export function useEventStream() {
	useEffect(() => {
		connectionManager.connect();
		return () => connectionManager.cleanup();
	}, []);
}
