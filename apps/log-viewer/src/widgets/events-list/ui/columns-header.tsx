import { memo } from "react";
import { columnsHeader } from "./event-list.style";

function ColumnsHeaderCmp() {
	return (
		<div className={columnsHeader} aria-hidden="true">
			<span>TIME</span>
			<span>LEVEL</span>
			<span>NAMESPACE</span>
			<span>TYPE</span>
			<span>OBJECT</span>
			<span>MESSAGE</span>
			<span>SOURCE</span>
		</div>
	);
}
export const ColumnsHeader = memo(ColumnsHeaderCmp);
