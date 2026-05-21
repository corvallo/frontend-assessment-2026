import type { Config, ServerRate } from "./types";

export async function patchConfig(rate: ServerRate): Promise<Config> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/config`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ rate }),
	});
	if (!response.ok) throw new Error("Failed to update config");
	return response.json() as Promise<Config>;
}
