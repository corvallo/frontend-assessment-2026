import { ConnectionStatus } from "@/features/connection-status";
import { EventsCounter } from "@/features/events-counter";
import { Logo } from "@/features/logo/ui";
import { MalformedCounter } from "@/features/malformed-counter";
import { ReconnectionCounter } from "@/features/reconnection-counter";
import { ThemeToggle } from "@/features/theme-toggle";
import { headerRightStyle, headerStyle } from "./header.style";

export function Header() {
	return (
		<header className={headerStyle}>
			<Logo />
			<div className={headerRightStyle}>
				<div className="hidden md:grid md:grid-cols-4 md:gap-2">
					<EventsCounter />
					<MalformedCounter />
					<ReconnectionCounter />
					<ConnectionStatus />
				</div>
				<ThemeToggle />
			</div>
		</header>
	);
}
