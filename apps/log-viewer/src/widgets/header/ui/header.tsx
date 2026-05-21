import { Logo } from "@/features/logo/ui";
import { ThemeToggle } from "@/features/theme-toggle";
import { headerStyle, wrapperStyle } from "./header.style";

export function Header() {
	return (
		<header className={headerStyle}>
			<div className={wrapperStyle}>
				<Logo />
				<ThemeToggle />
			</div>
		</header>
	);
}
