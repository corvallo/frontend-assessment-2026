import { columnsHeader } from "./event-list.style";

export function ColumnsHeader() {
	return (
		<div className={columnsHeader}>
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
