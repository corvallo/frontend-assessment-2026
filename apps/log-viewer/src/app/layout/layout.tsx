import type { PropsWithChildren } from "react";
import { footerStyle, headerStyle, mainStyle } from "./layout.style";

type LayoutProps = PropsWithChildren;
export function Layout({ children }: LayoutProps) {
	return (
		<>
			<header className={headerStyle}>Header</header>
			<main className={mainStyle}>{children}</main>
			<footer className={footerStyle}></footer>
		</>
	);
}
