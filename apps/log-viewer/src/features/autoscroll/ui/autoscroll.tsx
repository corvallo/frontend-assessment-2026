import { Label, Switch } from "@/shared/ui";
import { useAutoScrollStore } from "../model/store";

export function Autoscroll() {
	const { autoScroll, setAutoScroll } = useAutoScrollStore();
	return (
		<div className="flex items-center space-x-2">
			<Switch
				id="auto-scroll"
				checked={autoScroll}
				onCheckedChange={setAutoScroll}
			/>
			<Label htmlFor="auto-scroll">Auto Scroll</Label>
		</div>
	);
}
