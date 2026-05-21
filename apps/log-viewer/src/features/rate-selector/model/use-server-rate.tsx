import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useConnectionStore } from "@/entities/event/model";
import { ConnectionState } from "@/entities/event/model/types";
import { getConfig, patchConfig, type ServerRate } from "@/shared/api/config";

export function useServerRate() {
	const [rate, setRate] = useState<ServerRate | null>(null);
	const connectionState = useConnectionStore((s) => s.connectionState);
	const rateRef = useRef(rate);
	rateRef.current = rate;

	useEffect(() => {
		if (connectionState !== ConnectionState.connected) return;
		getConfig()
			.then((config) => setRate(config.rate))
			.catch(() => {});
	}, [connectionState]);

	const updateServerRate = useCallback(async (newRate: ServerRate) => {
		const prev = rateRef.current;
		setRate(newRate);
		try {
			await patchConfig(newRate);
			setRate(newRate);
		} catch (e) {
			setRate(prev);
			toast.error("Unable to change server rate", {
				description: "Check your connection and try again",
				position: "top-center",
			});
			console.error("[RateSelector] patchConfig failed", e);
		}
	}, []);
	return { rate, updateServerRate };
}
