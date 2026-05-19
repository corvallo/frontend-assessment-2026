import type { K8sEventType } from "@/shared/api/events/types";
import { Badge } from "@/shared/ui/badge";

const variantMap = {
	Normal: "success",
	Warning: "warning",
	Malformed: "destructive",
} as const satisfies Record<
	K8sEventType | "Malformed",
	"success" | "warning" | "destructive"
>;

type EventLevelBadgeProps = { type: K8sEventType | "Malformed" | undefined };

export function EventLevelBadge({ type }: EventLevelBadgeProps) {
	const variant = type ? variantMap[type] : "success";
	return <Badge variant={variant}>{type ?? "—"}</Badge>;
}
