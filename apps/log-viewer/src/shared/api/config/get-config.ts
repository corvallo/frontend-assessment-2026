import type { Config } from "./types";

export async function getConfig(): Promise<Config> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/config`);
	if (!response.ok) throw new Error("Failed to fetch config");
	return response.json() as Promise<Config>;
}
