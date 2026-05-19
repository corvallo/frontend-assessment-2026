import { Search } from "lucide-react";
import { memo } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/shared/ui";

function EventsSearchCmp() {
	return (
		<InputGroup className="max-w-xs h-10">
			<InputGroupInput placeholder="Search..." />
			<InputGroupAddon>
				<Search />
			</InputGroupAddon>
			<InputGroupAddon align="inline-end">
				<InputGroupButton className="h-8" variant="secondary">
					Search
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}
export const EventsSearch = memo(EventsSearchCmp);
