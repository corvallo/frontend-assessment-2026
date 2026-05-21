import { useEventDetailTitle } from "../model/use-event-detail-title";
import { dialogTitle } from "./event-detail.style";

export function EventDetailTitle() {
	const title = useEventDetailTitle();
	return <span className={dialogTitle}>{title}</span>;
}
