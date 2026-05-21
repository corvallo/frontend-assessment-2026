import { ArrowDownIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "@/shared/ui";
import { useAutoScrollStore } from "../model";
import { scrollToBottomStyle } from "./scroll-to-bottom.style";

type ScrollToBottomProps = {
	onScrollToEnd: () => void;
	isScrollable: boolean;
};
function ScrollToBottomCmp({
	onScrollToEnd,
	isScrollable,
}: ScrollToBottomProps) {
	const autoScroll = useAutoScrollStore((s) => s.autoScroll);
	const setAutoScroll = useAutoScrollStore((s) => s.setAutoScroll);
	if (autoScroll || !isScrollable) return null;

	return (
		<Button
			size="icon"
			className={scrollToBottomStyle}
			title="Scroll to the latest event"
			aria-label="Scroll to the latest event"
			onClick={() => {
				onScrollToEnd();
				setAutoScroll(true);
			}}
		>
			<ArrowDownIcon className="size-4" />
		</Button>
	);
}
export const ScrollToBottom = memo(ScrollToBottomCmp);
