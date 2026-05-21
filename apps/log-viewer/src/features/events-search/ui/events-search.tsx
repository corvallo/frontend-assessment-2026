import { Search } from "lucide-react";
import { memo } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/shared/ui";
import { useInputSearch } from "../model";

function EventsSearchCmp() {
	const { submitQuery, handleChange } = useInputSearch();
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submitQuery();
			}}
		>
			<InputGroup className="max-w-xs h-10">
				<InputGroupInput
					placeholder="Search events..."
					aria-label="Search events"
					onChange={(e) => handleChange(e.target.value)}
				/>
				<InputGroupAddon>
					<Search />
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<InputGroupButton className="h-8" variant="secondary" type="submit">
						Search
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
}
export const EventsSearch = memo(EventsSearchCmp);
