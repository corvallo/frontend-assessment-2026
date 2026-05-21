import { ServerRate } from "@/shared/api/config";
import { ButtonGroup } from "@/shared/ui";
import { useServerRate } from "../model";
import { RateSelectorButton } from "./rate-selector-button";

export function RateSelector() {
	const { rate, updateServerRate } = useServerRate();

	return (
		<ButtonGroup>
			{Object.keys(ServerRate).map((rt) => (
				<RateSelectorButton
					key={rt}
					rate={rt as ServerRate}
					isSelected={rt === rate}
					onSelect={updateServerRate}
				/>
			))}
		</ButtonGroup>
	);
}
