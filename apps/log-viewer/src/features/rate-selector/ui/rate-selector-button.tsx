import { memo } from "react";
import type { ServerRate } from "@/shared/api/config";
import { Button } from "@/shared/ui";

type RateSelectorButtonProps = {
	isSelected: boolean;
	rate: ServerRate;
	onSelect: (rate: ServerRate) => void;
};
export function RateSelectorButtonCmp({
	onSelect,
	isSelected,
	rate,
}: RateSelectorButtonProps) {
	return (
		<Button
			variant={isSelected ? "default" : "outline"}
			className={`capitalize `}
			onClick={() => onSelect(rate)}
			title={`Set server rate to ${rate}`}
			aria-label={`Set server rate to ${rate}`}
			aria-pressed={isSelected}
		>
			{rate}
		</Button>
	);
}

export const RateSelectorButton = memo(RateSelectorButtonCmp);
