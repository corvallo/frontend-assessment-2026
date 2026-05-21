import type { ValueOf } from "@/shared/model/types";

export const ServerRate = {
	slow: "slow",
	medium: "medium",
	fast: "fast",
	ludicrous: "ludicrous",
} as const;

export type ServerRate = ValueOf<typeof ServerRate>;
export type Config = {
	rate: ServerRate;
	spikeProbability: number;
	malformedProbability: number;
	serverRestartIntervalSeconds: number;
};
