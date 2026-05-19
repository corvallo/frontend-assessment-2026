import type { PropsWithChildren } from "react";
import { useEventStream } from "@/entities/event";
import { Header } from "@/widgets/header";
import { footerStyle, mainStyle } from "./layout.style";

type LayoutProps = PropsWithChildren;
export function Layout({ children }: LayoutProps) {
	useEventStream();
	return (
		<>
			<Header />
			<main className={mainStyle}>{children}</main>
			<footer className={footerStyle}></footer>
		</>
	);
}
