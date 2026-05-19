export function formatTime(iso?: string): string {
	if (!iso) return "—";
	return new Date(iso).toLocaleTimeString("en-US", { hour12: false });
}
